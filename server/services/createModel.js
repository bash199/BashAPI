import {model} from "mongoose";
const models = {};
export const createModel = async (name, schema) => {
   if (!models[name]) {
      models[name] = model(name, schema, name);
   }
   return models[name];
};

export const modifieModelSchema = async (name, fieldsToRemove, fieldsToAdd) => {
   models[name].schema.add(fieldsToAdd);
   models[name].schema.remove(fieldsToRemove);
   return models[name];
};
