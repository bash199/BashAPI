import {CollectionModel} from "../model/collection.model.js";
import {createModel} from "../services/createModel.js";
import {createSchema} from "../services/createSchema.js";
import {generateCollectionName} from "../utils/generateCollectionName.js";

export const authCollection = async (req, res, next) => {
   console.log("authCollection");
   try {
      const {collectionName} = req.params;
      const {user} = req;
      const name = generateCollectionName(collectionName, user._id);
      const collection = await CollectionModel.findOne({name});
      const schema = await createSchema(collection.schema);
      const Model = await createModel(name, schema);

      if (!collection) throw new Error("collection not found");

      req.collection = collection;
      req.Model = Model;
      next();
   } catch (e) {
      console.log(e);
      res.status(401).send(e.message);
   }
};
