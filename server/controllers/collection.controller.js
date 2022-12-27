import mongoose, {deleteModel} from "mongoose";
import {CollectionModel} from "../model/collection.model.js";
import {User} from "../model/user.model.js";
import {createCollection, deleteCollection} from "../utils/collection.utils.js";
import {generateCollectionName} from "../utils/generateCollectionName.js";

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
      const {user, Model, collection} = req;
      const deletedCollection = await deleteCollection(user, collection);
      res.send(deletedCollection);
   } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
   }
};
