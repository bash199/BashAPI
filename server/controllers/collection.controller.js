import {
   createCollection,
   deleteCollection,
   updateCollection,
} from "../utils/collection.utils.js";

export const createUserCollection = async (req, res) => {
   try {
      const {schema, name} = req.body;
      const {user} = req;
      const newCollection = await createCollection(schema, name, user);
      res.status(201).send(newCollection);
   } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
   }
};

export const updateUserCollection = async (req, res) => {
   try {
      const {addedFields, updatedSchema, removedFields} = req.body;
      const {collection, schema} = req;

      const updatedCollection = await updateCollection(
         collection,
         schema,
         addedFields,
         updatedSchema,
         removedFields
      );
      res.status(200).send(updatedCollection);
   } catch (err) {
      console.log(err);
      res.status(400).send(err.message);
   }
};

export const deleteUserCollection = async (req, res) => {
   try {
      const {user, collection} = req;
      const deletedCollection = await deleteCollection(user, collection);
      res.send(deletedCollection);
   } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
   }
};

export const getUserCollection = async (req, res) => {
   try {
      const {Model} = req;
      const collection = await Model.find({});
      res.status(200).send(collection);
   } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
   }
};

export const getAllUserCollections = async (req, res) => {
   try {
      const {user} = req;
      res.status(200).send(user.collections);
   } catch (err) {
      console.log(err);
      res.status(404).send(err.message);
   }
};

const reverseGeneratedName = (name) => {
   const newName = name.substr(name.lastIndexOf("_") + 1);
   return newName;
};
