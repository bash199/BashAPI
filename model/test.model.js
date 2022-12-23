import {Schema, model} from "mongoose";

const dynamicSchema = new Schema({
   name: String,
   // schema: Schema.Types.Mixed,
});

export const User = model("User", dynamicSchema);
