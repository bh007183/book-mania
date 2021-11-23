const router = require("express").Router();
const { User } = require("../Models");
const { signToken, compare, parseToken } = require("../utils/auth");

router.get("/", parseToken, async (req,res)=> {
    console.log(res.locals)
    try{
        let user = await User.findById(res.locals)
        .select(["-password"])
        .populate({ path: "friends" })
        .populate({ path: "recommended" })
        .populate({ path: "readingList" })
        .populate({ path: "usercurrent" });
        res.status(200).json(user)
    }catch(err){
        res.status(400).send(err.message)
    }
    
})
router.get("/readinglist", parseToken, async (req,res)=> {
    console.log(res.locals)
    try{
        let user = await User.findById(res.locals).select(["-password"])
       .populate({ path: "readingList" })

        res.status(200).json(user)
    }catch(err){
        res.status(400).send(err.message)
    }
    
})

router.get("/friends", parseToken, async (req,res)=> {
    console.log("this route")
    console.log(res.locals)
    try{
        let user = await User.findById(res.locals).select(["-password"])
        .populate({ path: "friends", populate: { path: 'readingList' }, populate: { path: 'usercurrent' }})

        res.status(200).json(user)
    }catch(err){
        res.status(400).send(err.message)
    }
    
})

router.post("/follow",  parseToken, async (req, res) => {
    try {
      
      let user = await User.findByIdAndUpdate(res.locals._id, {
          $addToSet: {friends: req.body.followId}
      })
      
      res.sendStatus(201);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

router.post("/recommend",  parseToken, async (req, res) => {
    try {
      
      let user = await User.findByIdAndUpdate(res.locals._id, {
          $addToSet: {friends: req.body.followId}
      })
      
      res.sendStatus(201);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

module.exports = router;
