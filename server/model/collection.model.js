import {Schema, model} from "mongoose";
import {User} from "./user.model.js";

const collectionSchema = new Schema(
   {
      name: {
         type: String,
         required: true,
         unique: true,
      },
      schema: {
         type: Schema.Types.Mixed,
      },
      owner: {
         userId: {
            type: Schema.Types.ObjectId,
         },
      },
   },
   {strict: false}
);

// Updates the user with the collection id
collectionSchema.pre("save", async function (next) {
   const currentUser = this;
   if (currentUser.isModified("proprietors")) {
      currentUser.proprietors.forEach(async (proprietor) => {
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

const CollectionModel = model("Collection", collectionSchema);

export {CollectionModel};
