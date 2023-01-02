import mongoose, {deleteModel} from "mongoose";
import {CollectionModel} from "../model/collection.model.js";
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
   try {
      await CollectionModel.findOneAndDelete({name: collection.name});
      user.collections = user.collections.filter(
         (el) => el.name !== collection.name
      );
      mongoose.connection.dropCollection(collection.name);
      deleteModel(collection.name);
      const modifiedUser = await user.save();
      return modifiedUser;
   } catch (error) {
      console.log(error);
   }
};

export const updateCollection = async (
   collection,
   schema,
   updatedSchema,
   removedFields
) => {
   collection.schema = updatedSchema;
   await collection.save();
   const newSchema = await modifieSchema(schema, removedFields, updatedSchema);
   return newSchema;
};

export const addDocs = async (user) => {
   user.collections = user.collections.map(
      async (cc) => {
         const collection = await CollectionModel.findOne({name:cc.name});
         if (collection) {
            const Model = await createModel(cc.name, collection.schema);
            cc.documentCount = await Model.countDocuments({});
         }
         console.log(cc.name);
         return {
            name:cc.name,
            collectionId:cc.collectionId,
            _id:cc._id,
            documentCount:cc.documentCount,
         };
      }
   );
   const countDocsUser = await user.save();
   return countDocsUser;
};

// const {schema} = await CollectionModel.findOne({name: collec.name});
// const Model = await createModel(collec.name, schema);
// const DocumentsCount = await Model.countDocuments({});
// collec.documentCount = DocumentsCount;
