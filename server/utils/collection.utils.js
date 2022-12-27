import {CollectionModel} from "../model/collection.model.js";
import {User} from "../model/user.model.js";
import {createModel} from "../services/createModel.js";
import {createSchema} from "../services/createSchema.js";

export const createCollection = async (schema, collectionName, userId) => {
   const generatedname = generateCollectionName(collectionName, userId);
   const newCollection = await CollectionModel.create({
      name: generatedname,
      schema,
      owner: {userId},
   });
   const newSchema = await createSchema(newCollection.schema);
   await createModel(newCollection.name, newSchema);
   await User.findOneAndUpdate(
      {_id: userId},
      {
         $push: {
            collections: {
               name: newCollection.name,
               collectionId: newCollection._id,
            },
         },
      }
   );
   return newCollection;
};
export const generateCollectionName = (name, id) => {
   const newname = `${id}_${name}`;
   return newname;
};
