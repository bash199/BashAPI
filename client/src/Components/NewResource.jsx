import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../api/Api";

export const Overlay = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: -50px;
   background-color: rgba(0, 0, 0, 0.4);
   display: grid;
   align-items: center;
   justify-items: center;
   z-index: 0;
`;
const FormBox = styled.div`
   max-width: 50%;
   height: 80vh;
   padding: 10px;
   border-radius: 7px;
   background-color: antiquewhite;
`;
const NewResource = ({setResource}) => {
   const [fields, setFields] = useState([{name: "", type: ""}]);
   const [name, setName] = useState("");
   const [token, setToken] = useState(null);
   useEffect(() => {
      setToken(localStorage.getItem("BashApitoken"));
   }, []);

   const handleChange = (i, {target: {value, name}}) => {
      const values = [...fields];
      values[i][name] = value;
      setFields(values);
   };

   const handleAdd = () => {
      const values = [...fields];
      values.push({name: "", type: ""});
      setFields(values);
   };

   const handleRemove = (i) => {
      const values = [...fields];
      values.splice(i, 1);
      setFields(values);
   };

   const fillSchema = () => {
      let schema = {};
      fields.forEach(({name, type}) => {
         schema[name] = type;
      });
      return schema;
   };

   const handleCreate = async () => {
      try {
         const schema = fillSchema();
         const data = await Api.post(`/collection/${token}/newCollection`, {
            name,
            schema,
         });
         console.log(data);
         setResource((prev) => !prev);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div>
         <Overlay>
            <FormBox>
               <button onClick={() => setResource((prev) => !prev)}>X</button>
               <div>
                  <h4>Resource Name</h4>
                  <small htmlFor="ResourceName">
                     Enter meaningful resource name, it will be used to generate
                     API endpoints.
                  </small>
                  <div>
                     <input
                        id="ResourceName"
                        type="text"
                        value={name}
                        onChange={({target: {value}}) => setName(value)}
                     />
                  </div>
               </div>
               <h4>Schema </h4>
               <small>
                  Define Resource schema, it will be used to generate mock data.
               </small>
               <form>
                  <input disabled={true} defaultValue={"_id"} />
                  <input defaultValue={"ObjectId"} disabled={true} />
                  {fields.map((field, i) => (
                     <div key={i}>
                        <input
                           type="text"
                           name="name"
                           value={field.name}
                           onChange={(e) => handleChange(i, e)}
                        />

                        <select
                           name="type"
                           value={field.type}
                           onChange={(e) => handleChange(i, e)}
                        >
                           <option value="">--</option>
                           <option value="String">String</option>
                           <option value="Number">Number</option>
                           <option value="Boolean">Boolean</option>
                           <option value="Array">Array</option>
                           <option value="Object">Object</option>
                        </select>
                        <button type="button" onClick={() => handleRemove(i)}>
                           -
                        </button>
                     </div>
                  ))}
                  <button type="button" onClick={handleAdd}>
                     +
                  </button>
               </form>
               <div>
                  <button onClick={handleCreate}>Create</button>
                  <button onClick={() => setResource((prev) => !prev)}>
                     Cancel
                  </button>
               </div>
            </FormBox>
         </Overlay>
      </div>
   );
};

export default NewResource;
