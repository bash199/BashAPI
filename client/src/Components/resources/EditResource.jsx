import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";
import {
   Btn,
   Btn2,
   ButtonBox,
   FooterBtns,
   FooterBtnsInnerBox,
   FormBox,
   FormInnerBox,
   FormOverFlowDiv,
   Input,
   Overlay,
   Select,
} from "./NewResource";




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
               <FormInnerBox>
                  <FormOverFlowDiv>
                     <ButtonBox>
                        <Btn onClick={() => setEdit((prev) => !prev)}>X</Btn>
                     </ButtonBox>
                     <h4>Schema </h4>
                     <small>
                        Define Resource schema, it will be used to generate mock
                        data.
                     </small>
                     <form>
                        <Input disabled={true} defaultValue={"_id"} />
                        <Input defaultValue={"ObjectId"} disabled={true} />
                        {fields.map((field, i) => (
                           <div key={i}>
                              <Input
                                 type="text"
                                 name="name"
                                 placeholder="Field name"
                                 value={field.name}
                                 onChange={({target}) =>
                                    handleChange(i, target)
                                 }
                              />
                              <Select
                                 name="type"
                                 value={field.type}
                                 onChange={({target}) =>
                                    handleChange(i, target)
                                 }
                              >
                                 <option value="">---</option>
                                 <option value="String">String</option>
                                 <option value="Number">Number</option>
                                 <option value="Boolean">Boolean</option>
                                 <option value="Array">Array</option>
                                 <option value="Object">Object</option>
                              </Select>
                              <Btn
                                 type="button"
                                 onClick={() => handleRemove(i)}
                              >
                                 -
                              </Btn>
                           </div>
                        ))}
                        <div style={{margin: "5px"}}>
                           <Btn type="button" onClick={handleAdd}>
                              +
                           </Btn>
                        </div>
                     </form>
                     <div style={{padding: " 0 5px"}}>
                        <h4>Endpoints:</h4>
                        <h5>
                           GET -{">"} /{collecName}
                        </h5>
                        <h5>
                           GET -{">"} /{collecName}/:id
                        </h5>
                        <h5>
                           POST -{">"} /{collecName}
                        </h5>
                        <h5>
                           PUT -{">"} /{collecName}/:id
                        </h5>
                        <h5>
                           DELETE -{">"} /{collecName}/:id
                        </h5>
                     </div>
                  </FormOverFlowDiv>
                  <FooterBtns>
                     <FooterBtnsInnerBox>
                        <Btn2 onClick={handleUpdate}>Update</Btn2>
                        <Btn2 onClick={() => setEdit((prev) => !prev)}>
                           Cancel
                        </Btn2>
                     </FooterBtnsInnerBox>
                  </FooterBtns>
               </FormInnerBox>
            </FormBox>
         </Overlay>
      </div>
   );
};

export default EditResource;
