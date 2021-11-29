const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")
const bookSchema = require("./Book")

const userSchema = new Schema({
    firstName:{
        type: String,
        required: [true, 'First Name is required'],
        
    },
    lastName:{
        type: String,
        required: [true, 'Last Name  is required'],
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
              },
            message: props => `${props.value} is not a valid email address!`,
        },
        
        required: [true, 'User email is required']
    },
    password:{
        type: String,
        required: [true, 'User password is required'],
        minLength: 4,
        maxlength: 8,
        select: false
    },
    pendingconnection: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },

    connection: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    

    recommended: {
        type: [bookSchema]
    },

    readingList: {
        type: [bookSchema]
    },
    readingHistory: {
        type: [bookSchema]
    },

    usercurrent: {
        type:  bookSchema
    }





})
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    try {
        
      if (this._update.password) {
        const hashed = await bcrypt.hash(this._update.password, 10);
        this._update.password = hashed;
      }
      next();
    } catch (err) {
        err.message = "No changes detected. You did not make any changes so your account was not updated."
      return next(err);
    }
  });

  const User = model("User", userSchema)

  module.exports = User