import {Schema} from "mongoose";

export const createSchema = async (schema) => {
   const newSchema = new Schema({});
   newSchema.add(schema);
   return newSchema;
};
