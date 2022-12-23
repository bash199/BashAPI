import {connect, set} from "mongoose";
import dotenv from "dotenv";

set("strictQuery", true);

const URL = `mongodb+srv://Bash:S0eqlCZJ2k8itSft@cluster0.0nzxfm0.mongodb.net/test`;

connect(URL, (error, mongoConnection) => {
   if (error) {
      throw new Error("MongoDB connection error: " + error);
   }
   const {host, port, name} = mongoConnection;
   console.log({host, port, name});
});


// const projectSchema = new Schema({
   // name: {type: String, uniqe: true},// project name
//   
// });

// const Project = model("Project", projectSchema);


`
accounts = {
   email : 'brtr99@gmail.com',
   password : 'somePassword',
   _id : account ID,
   Projects: [
      {
         name : projectName,
         _id : project ID,
         resources : [ 
            {
               name : resource Name,
               _id  : resource ID
            },
            {
               name : resource Name,
               _id  : resource ID
            },
            {
               name : resource Name,
               _id  : resource ID
            }
         ]
      }
   ]
}








`;
