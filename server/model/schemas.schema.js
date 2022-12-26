import {Schema, model} from "mongoose";

const allSchemasschema = new Schema({
   name: {type: String, unique: true, trim: true},
   schem: Schema.Types.Mixed,
   mode: String,
});

const Schemas = model("schema", allSchemasschema);

export {Schemas};
