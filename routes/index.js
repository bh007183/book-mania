const router = require("express").Router();
const { signToken, compare, parseToken } = require("../utils/auth");
const protectedRoutes = require("./protected")

router.use("/:_id", parseToken, protectedRoutes)

module.exports = router