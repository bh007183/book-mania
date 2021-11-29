const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");
var mongoose = require("mongoose");

router.get("/", parseToken, async (req, res) => {
  
  try {
    let user = await User.findById(res.locals._id)
      .select(["-password"])
      .populate({ path: "pendingconnection" })
      .populate({path: "connection"})
      .populate({ path: "recommended", populate: { path: "recommended", select: "firstName lastName" }})
      .populate({ path: "readingList" })
      .populate({ path: "usercurrent" });
      console.log(user)
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/readinglist", parseToken, async (req, res) => {
  console.log(res.locals);
  try {
    let user = await User.findById(res.locals._id)
      .select(["-password"])
      .populate({ path: "readingList" });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/friends", parseToken, async (req, res) => {
  console.log("this route");
  console.log(res.locals);
  try {
    let user = await User.findById(res.locals._id)
      .select(["-password"])
      .populate({
        path: "connection",
        populate: { path: "readingList" },
        populate: { path: "usercurrent" },
      });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/connect/ask", parseToken, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.body.followId, {
      $addToSet: { pendingconnection: res.locals._id },

    },{new: true});
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/connect/response", parseToken, async (req, res) => {
  try {
    if(req.body.accept){
      let user = await User.findByIdAndUpdate(res.locals._id, {
        $addToSet: { connection: req.body.followId },
        $pull: {pendingconnection: req.body.followId}
  
      },{new: true});
      let other = await User.findByIdAndUpdate(req.body.followId, {
        $addToSet: { connection: res.locals._id },
  
      },{new: true});
    }else{
      let user = await User.findByIdAndUpdate(res.locals._id, {
        $pull: {pendingconnection: req.body.followId}
      }
      )
    }
    

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/recommend", parseToken, async (req, res) => {
  try {
    // Finds if User exists and if is following individual
    let sender = await User.findById(res.locals._id, {
      connection: {
        $elemMatch: { $eq: mongoose.Types.ObjectId(req.body.friendId) },
      },
    });
    // if now response or not connection throw error
    if (!sender || sender.connection.length < 1) {
      throw new Error(
        "You must first follow them before you can add recommendations."
      );
    }
    //   if is folowing then add to their recommended list
    let user = await User.findByIdAndUpdate(req.body.friendId, {
      $addToSet: {
        recommended: {
          title: req.body.title,
          description: req.body.description,
          thumbnail: req.body.thumbnail,
          recommended: mongoose.Types.ObjectId(res.locals._id),
        },
      },
    },{new: true});

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/currentreading", parseToken, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(res.locals._id, {
      usercurrent: req.body

    },{new: true});
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.post("/readinglist", parseToken, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(res.locals._id, {
      readinglist: req.body

    },{new: true});
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.put("/user", parseToken, async (req, res) => {
  try {
    let user = await User.findById(res.locals._id).select("password");
    console.log(user)
   
    if(compare(user, req.body)){
      let updatedUser = await User.findOneAndUpdate({_id: res.locals._id}, req.body.edit, {new: true});
      res.json(updatedUser)

    }else{
      res.status(400).send("Invalid password");
    }

   
  } catch (err) {
    console.log(err)
    res.status(400).send(err.message);
  }
});



module.exports = router;
