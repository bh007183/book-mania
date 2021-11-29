const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");
router.post("/user", async (req, res) => {
  try {
  
    let user = await User.create(req.body);
    let token = await signToken(user);
    res.status(200).json({ _id: user._id, token });
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).select("password")
    console.log(req.body)
    if (!user || !compare(user, req.body)) {
      throw new Error("Invalid Credentials. Please try again!");
    }
    let token = await signToken(user);
    res.status(200).json({ _id: user._id, token: token});
  } catch (err) {
    res.status(400).send(err.message);
  }
});





module.exports = router;
