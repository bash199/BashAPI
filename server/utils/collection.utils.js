import mongoose, {deleteModel} from "mongoose";
import {CollectionModel} from "../model/collection.model.js";
import {User} from "../model/user.model.js";
import {createModel} from "../services/createModel.js";
import {createSchema, modifieSchema} from "../services/createSchema.js";
import {generateCollectionName} from "./generateCollectionName.js";

export const createCollection = async (schema, collectionName, user) => {
   const generatedname = generateCollectionName(collectionName, user._id);
   const newCollection = await CollectionModel.create({
      name: generatedname,
      schema,
      owner: {userId: user._id},
   });
   const newSchema = await createSchema(newCollection.schema);
   await createModel(newCollection.name, newSchema);
   user.collections.push({
      name: newCollection.name,
      collectionId: newCollection._id,
   });
   await user.save();
   return newCollection;
};

export const deleteCollection = async (user, collection) => {
   await CollectionModel.findOneAndDelete({name: collection.name});
   user.collections = user.collections.filter(
      (el) => el.name !== collection.name
   );
   mongoose.connection.dropCollection(collection.name);
   deleteModel(collection.name);
   const modifiedUser = await user.save();
   return modifiedUser;
};

export const updateCollection = async (
   collection,
   schema,
   addedFields,
   updatedSchema,
   removedFields
) => {
   collection.schema = updatedSchema;
   await collection.save();
   const newSchema = await modifieSchema(schema, removedFields, addedFields);
   return newSchema;
};
