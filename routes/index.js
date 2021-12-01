const router = require("express").Router();
const { signToken, compare, parseToken } = require("../utils/auth");
const protectedRoutes = require("./protected")
const postUser = require("./user-routes.js")


router.use("/public/api", postUser)
router.use("/protected/api", parseToken, protectedRoutes)
router.use((req, res)=> {
    res.status(500).send("No matching routes")
})

module.exports = router