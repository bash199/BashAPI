import {Schema, model} from "mongoose";

export const createSchema = async (schema) => {
   const newSchema = new Schema(schema);
   return newSchema;
};
