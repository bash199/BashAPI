import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";

export const Overlay = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: -55px;
   background-color: rgba(0, 0, 0, 0.4);
   display: grid;
   align-items: center;
   justify-items: center;
   z-index: 0;
`;

export const FormBox = styled.div`
   max-width: 600px;
   width: 50%;
   height: 50vh;
   padding: 10px;
   border-radius: 7px;
   background-color: antiquewhite;
   -webkit-animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
   animation: fade-in 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
   @media (max-width: 500px) {
      width: 80%;
      height: 100vh;
   }
   @-webkit-keyframes fade-in {
      0% {
         opacity: 0;
      }
      100% {
         opacity: 1;
      }
   }
   @keyframes fade-in {
      0% {
         opacity: 0;
      }
      100% {
         opacity: 1;
      }
   }
`;

const ExitButtonBox = styled.div`
   width: 100%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: end;
`;
const ButtonsBox = styled.div`
   width: 100%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: center;
`;
const EditResource = ({setEdit, collection}) => {
   const collecName = reverseGeneratedName(collection.name);
   const [fields, setFields] = useState([]);
   const [removedFields, setRemovedFields] = useState([]);
   const [token] = useState(localStorage.getItem("BashApitoken"));

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
   useEffect(() => {
      getData();
      // eslint-disable-next-line
   }, []);

   const handleChange = (i, {value, name}) => {
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
         const data = await Api.put(
            `/collection/update/${token}/${collecName}`,
            {
               updatedSchema,
               removedFields,
            }
         );
         // console.log(data);
         setEdit((prev) => !prev);
      } catch (err) {
         console.log(err.response);
      }
   };

   return (
      <div>
         <Overlay>
            <FormBox>
               <ExitButtonBox>
                  <button onClick={() => setEdit((prev) => !prev)}>X</button>
               </ExitButtonBox>
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
                           placeholder="Field name"
                           value={field.name}
                           onChange={({target}) => handleChange(i, target)}
                        />
                        <select
                           name="type"
                           value={field.type}
                           onChange={({target}) => handleChange(i, target)}
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
                  <h5>
                     GET ={">"} /{collecName}
                  </h5>
                  <h5>
                     GET ={">"} /{collecName}/:id
                  </h5>
                  <h5>
                     POST ={">"} /{collecName}
                  </h5>
                  <h5>
                     PUT ={">"} /{collecName}/:id
                  </h5>
                  <h5>
                     DELETE ={">"} /{collecName}/:id
                  </h5>
               </div>
               <ButtonsBox>
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEdit((prev) => !prev)}>
                     Cancel
                  </button>
               </ButtonsBox>
            </FormBox>
         </Overlay>
      </div>
   );
};

export default EditResource;
