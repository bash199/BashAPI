import {Schema, model} from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error("must be valid Email links");
         }
      },
   },
   password: {
      type: String,
      required: true,
      trim: true,
   },
   tokens: [
      {
         token: {
            type: String,
         },
      },
   ],
   collections: [
      {
         name: {
            type: String,
         },
         documentCount: {
            type: Number,
            default: 0,
         },
         collectionId: {
            type: Schema.Types.ObjectId,
         },
      },
   ],
});

userSchema.methods.generateAuthToken = async function () {
   const user = this;
   const secret = process.env.AUTH_SECRET;
   const token = jwt.sign({_id: user._id.toString()}, secret);

   user.tokens = user.tokens.concat({token});
   await user.save();

   return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
   const user = await User.findOne({email});
   if (!user) {
      throw new Error("Unable to login");
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
      throw new Error("Unable to login");
   }

   return user;
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
   const user = this;

   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
   }

   next();
});

export const User = model("User", userSchema);
