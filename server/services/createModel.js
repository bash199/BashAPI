import {model} from "mongoose";
const models = {};
export const createModel = async (name, schema) => {
   if (!models[name]) {
      models[name] = model(name, schema, name);
   }
   return models[name];
};
