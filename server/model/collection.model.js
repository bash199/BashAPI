import {Schema, model} from "mongoose";
import {User} from "./user.model.js";

const collectionSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true,
      },
      userSchema: {
         type: Schema.Types.Mixed,
      },
      proprietors: [
         {
            userId: {
               type: Schema.Types.ObjectId,
               ref: "User",
               required: true,
            },
         },
      ],
   },
   {strict: false}
);

// Updates the user with the collection reference
collectionSchema.pre("create", async function (next) {
   const user = this;
   if (user.isModified("proprietors")) {
      user.proprietors.forEach(async (proprietor) => {
         const user = await User.findById(proprietor.userId);
         user.collections.push({
            name: user.name,
            reference: user._id,
         });
         user.save();
      });
   }
   next();
});

const Collection = model("Collection", collectionSchema);

export {Collection};
