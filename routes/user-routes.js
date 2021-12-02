const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");
const axios = require("axios")
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

router.get("/browse", async (req, res) => {
try{
  let nytBestSellers = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=` + process.env.REACT_APP_NYT)
  let classics = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:%22classic+literature%22&tbs=,bkt:b&maxResults=30`)
  
  res.status(200).json({nytBestSellers: nytBestSellers.data.results.books, classics: classics.data.items})
}catch(err){
  console.log(err.message)
  res.status(400).send(err.message);
}

 





})





module.exports = router;
