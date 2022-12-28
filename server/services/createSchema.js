import {Schema} from "mongoose";

export const createSchema = async (schema) => {
   const newSchema = new Schema({});
   newSchema.add(schema);
   return newSchema;
};

// fieldsToRemove => array!!!
export const modifieSchema = async (schema, fieldsToRemove, fieldsToAdd) => {
   schema.add(fieldsToAdd);
   schema.remove(fieldsToRemove);
   return schema;
};
