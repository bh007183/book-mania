const { Schema, model } = require("mongoose");
const commentSchema = new Schema({
  comment: {
    type: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = commentSchema
