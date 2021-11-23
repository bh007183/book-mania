const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");
var mongoose = require("mongoose");

router.get("/", parseToken, async (req, res) => {
  console.log(res.locals);
  try {
    let user = await User.findById(res.locals)
      .select(["-password"])
      .populate({ path: "friends" })
      .populate({ path: "recommended" })
      .populate({ path: "readingList" })
      .populate({ path: "usercurrent" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.get("/readinglist", parseToken, async (req, res) => {
  console.log(res.locals);
  try {
    let user = await User.findById(res.locals)
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
    let user = await User.findById(res.locals)
      .select(["-password"])
      .populate({
        path: "following",
        populate: { path: "readingList" },
        populate: { path: "usercurrent" },
      });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/follow", parseToken, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(res.locals._id, {
      $addToSet: { following: req.body.followId },
    });
    let other = await User.findByIdAndUpdate(req.body.followId, {
      $addToSet: { followers: res.locals._id },
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/recommend", parseToken, async (req, res) => {
  try {
    // Finds if User exists and if is following individual
    let sender = await User.findById(res.locals._id, {
      following: {
        $elemMatch: { $eq: mongoose.Types.ObjectId(req.body.friendId) },
      },
    });
    // if now response or not following throw error
    if (!sender || sender.following.length < 1) {
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
    });

    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
