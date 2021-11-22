const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")


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
    },

    friends: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },

    recommended: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
    },

    readingList: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
    },

    usercurrent: {
        type: { type: Schema.Types.ObjectId, ref: 'Book' }
    }





})
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    
    next();
  });

  const User = model("User", userSchema)

  module.exports = User