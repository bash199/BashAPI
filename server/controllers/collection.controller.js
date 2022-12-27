import {Schema, model} from "mongoose";
import {createCollection} from "../utils/collection.utils.js";

export const createUserCollection = async (req, res) => {
   try {
      const {schema, name} = req.body;
      const {_id} = req.user;
      const newCollection = await createCollection(schema, name, _id);
      res.status(201).send(newCollection);
   } catch (error) {
      console.log(error);
      res.status(400).send(error.message);
   }
};
