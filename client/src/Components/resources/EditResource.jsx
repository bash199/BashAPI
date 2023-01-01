import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";

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

const EditResource = ({setEdit, collection}) => {
   const collecName = reverseGeneratedName(collection.name);
   const [fields, setFields] = useState([]);
   const [fields2, setFields2] = useState([]);
   const [removedFields, setRemovedFields] = useState([]);
   const [addedFields, setAddedFields] = useState([]);
   const [token] = useState(localStorage.getItem("BashApitoken"));

   useEffect(() => {
      const getData = async () => {
         try {
            const {
               data: {schema},
            } = await Api.get(`/collection/get/${token}/${collecName}`);
            for (const key in schema) {
               if (schema[key]) {
                  setFields((prev) => {
                     return [...prev, {name: key, type: schema[key]}];
                  });
               }
            }
         } catch (err) {
            console.log(err);
         }
      };
      getData();
      // eslint-disable-next-line
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
      const [removed] = values.splice(i, 1);
      if (!removedFields.includes(removed.name)) {
         setRemovedFields((prev) => [...prev, removed.name]);
      }
      setFields(values);
   };

   const fillSchema = () => {
      let schema = {};
      fields.forEach(({name, type}) => {
         schema[name] = type;
      });
      return schema;
   };

   const handleUpdate = async () => {
      try {
         const updatedSchema = fillSchema();
         const data = await Api.post(`collection/update/${token}/${collecName}`, {
            updatedSchema,
            removedFields,
         });
         console.log(data);
         setEdit((prev) => !prev);
      } catch (err) {
         console.log(err.response);
      }
   };
   return (
      <div>
         <Overlay>
            <FormBox>
               <button onClick={() => setEdit((prev) => !prev)}>X</button>
               <h4>Schema </h4>
               {/* {console.log()} */}
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
                           placeholder="Field name"
                           value={field.name}
                           onChange={(e) => handleChange(i, e)}
                        />
                        <select
                           name="type"
                           value={field.type}
                           onChange={(e) => handleChange(i, e)}
                        >
                           <option value="">---</option>
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
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEdit((prev) => !prev)}>
                     Cancel
                  </button>
               </div>
            </FormBox>
         </Overlay>
      </div>
   );
};

export default EditResource;