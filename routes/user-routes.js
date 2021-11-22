const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");
router.post("/api/user", async (req, res) => {
  try {
    let user = await User.create(req.body);
    let token = await signToken(user);
    res.sendStatus(200).json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email })
    if (!user || !compare(user, req.body)) {
      throw new Error("Invalid Credentials. Please try again!");
    }
    let token = await signToken(user);
    res.status(200).json({token: token});
  } catch (err) {
    res.status(400).send(err.message);
  }
});



module.exports = router;
