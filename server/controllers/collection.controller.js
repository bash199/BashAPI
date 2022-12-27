import {createCollection, deleteCollection} from "../utils/collection.utils.js";

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

export const getAllUserCollection = (req, res) => {
   try {
      const {user} = req;
      console.log(user);
      res.status(200).send(user);
   } catch (error) {
      console.log(err);
      res.status(404).send(err.message);
   }
};
