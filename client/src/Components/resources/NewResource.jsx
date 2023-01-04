import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";

export const Overlay = styled.div`
   position: absolute;
   top: 0;
   right: 0;
   left: 0;
   bottom: -100px;
   background-color: rgba(0, 0, 0, 0.4);
   display: grid;
   align-items: center;
   justify-items: center;
   z-index: 0;
`;

export const FormBox = styled.div`
   max-width: 600px;
   width: 50%;
   height: 70vh;
   padding: 10px;
   border-radius: 7px;
   background-color: #fff;
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
export const Input = styled.input`
   border-style: solid;
   width: calc(40% - 20px);
   font-weight: 500;
   font-size: 17px;
   padding: 5px 7px;
   margin: 0 5px;
   border-width: 2px;
   border-radius: 5px;
   color: #8a8a8a;
   background-color: #eee;
   border: none;
   margin-top: 8px;
   &:focus {
      outline-color: #2196f3;
      outline-offset: 3px;
      transition: all 0.1s ease-in-out;
   }
`;

export const RescorceNmeInput = styled.input`
   border-style: solid;
   width: calc(100% - 22px);
   font-weight: 500;
   font-size: 17px;
   padding: 5px 7px;
   border-width: 2px;
   border-radius: 5px;
   color: #8a8a8a;
   background-color: #eee;
   border: none;
   margin-top: 8px;
   &:focus {
      outline-color: #2196f3;
      outline-offset: 3px;
      transition: all 0.1s ease-in-out;
   }
`;

export const Select = styled.select`
   border-style: solid;
   width: calc(43% - 20px);
   font-weight: 600;
   font-size: 17px;
   padding: 5px 7px;
   margin: 0 5px;
   border-width: 2px;
   border-radius: 5px;
   color: #8a8a8a;
   background-color: #eee;
   border: none;
   margin-top: 8px;
   &:focus {
      outline-color: #2196f3;
      outline-offset: 3px;
      transition: all 0.1s ease-in-out;
   }
`;

export const ButtonBox = styled.div`
   width: 100%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: end;
`;

export const FooterBtns = styled.div`
   width: 100%;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: center;
   align-self: flex-end;
`;

export const FooterBtnsInnerBox = styled.div`
   width: 250px;
   margin: 5px 0 5px 0;
   display: flex;
   justify-content: space-between;
`;

export const Btn = styled.button`
   width: 50px;
   height: 22px;
   text-align: center;
   margin: 0 3px;
   background-color: #c2c2c2;
   color: #333;
   border-radius: 6px;
   border: none;
   cursor: pointer;
   &:active {
      transform: scale(0.98);
      transition: all 0.1s ease-in;
   }
`;

export const Btn2 = styled.button`
   width: 100px;
   height: 28px;
   text-align: center;
   background-color: #c2c2c2;
   color: #333;
   border-radius: 6px;
   border: none;
   cursor: pointer;
   &:active {
      transform: scale(0.98);
      transition: all 0.1s ease-in;
   }
`;

export const FormInnerBox = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   /* overflow: auto; */
`;

export const FormOverFlowDiv = styled.div`
   overflow: auto;
`;

const RescorceNameBox = styled.div`
   display: flex;
   justify-content: center;
`;

const NewResource = ({setResource,notify}) => {
   const [fields, setFields] = useState([{name: "", type: ""}]);
   const [name, setName] = useState("");
   const [error, setError] = useState("");
   const [token] = useState(localStorage.getItem("BashApitoken"));

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
         if (!name) {
            return;
         }
         await Api.post(`/collection/${token}/newCollection`, {
            name,
            schema,
         });
         setResource((prev) => !prev);
         notify('Created Successfully!')
      } catch (err) {
         if (err.response.data) {
            const i = err.response.data.indexOf(":");
            const str = err.response.data.substr(0, i);
            if (str === "E11000 duplicate key error collection") {
               return setError("Resource Name already in use");
            }
         }
         console.log(err);
      }
   };
   return (
      <div>
         <Overlay>
            <FormBox>
               <FormInnerBox>
                  <FormOverFlowDiv>
                     <ButtonBox>
                        <Btn onClick={() => setResource((prev) => !prev)}>
                           X
                        </Btn>
                     </ButtonBox>
                     <div>
                        <h4>Resource Name</h4>
                        <h6 style={{color: "brown"}}>{error}</h6>
                        <small htmlFor="ResourceName">
                           Enter meaningful resource name, it will be used to
                           generate API endpoints.
                        </small>
                        <RescorceNameBox>
                           <RescorceNmeInput
                              id="ResourceName"
                              type="text"
                              placeholder="Example: users, comments, articles"
                              value={name}
                              onChange={({target: {value}}) => setName(value)}
                           />
                        </RescorceNameBox>
                     </div>
                     <h4>Schema </h4>
                     <small>
                        Define Resource schema, it will be used to generate mock
                        data.
                     </small>
                     <form>
                        <div>
                           <Input disabled={true} defaultValue={"_id"} />
                           <Input defaultValue={"ObjectId"} disabled={true} />
                        </div>
                        <div>
                           {fields.map((field, i) => (
                              <div key={i}>
                                 <Input
                                    type="text"
                                    name="name"
                                    placeholder="Field name"
                                    value={field.name}
                                    onChange={(e) => handleChange(i, e)}
                                 />

                                 <Select
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
                                 </Select>
                                 <Btn
                                    type="button"
                                    onClick={() => handleRemove(i)}
                                 >
                                    Delete
                                 </Btn>
                              </div>
                           ))}
                        </div>
                        <div style={{margin: "5px"}}>
                           <Btn type="button" onClick={handleAdd}>
                              Add
                           </Btn>
                        </div>
                     </form>
                     <div style={{padding: " 0 5px"}}>
                        <h4>Endpoints</h4>
                        <h5>GET ={">"} /...</h5>
                        <h5>GET ={">"} /.../:id</h5>
                        <h5>POST ={">"} /...</h5>
                        <h5>PUT ={">"} /.../:id</h5>
                        <h5>DELETE ={">"} /.../:id</h5>
                     </div>
                  </FormOverFlowDiv>
                  <FooterBtns>
                     <FooterBtnsInnerBox>
                        <Btn2 onClick={handleCreate}>Create</Btn2>
                        <Btn2 onClick={() => setResource((prev) => !prev)}>
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

export default NewResource;
