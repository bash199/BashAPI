import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../api/Api";
import EditResource from "./resources/EditResource";
import {reverseGeneratedName} from "../utils/reverseGeneratedName";
const Div = styled.div`
   width: 50%;
   height: 80px;
   padding: 0 10px 0 10px;
   margin: 10px;
   background-color: aliceblue;
`;

const Collection = ({collection}) => {
   const [edit, setEdit] = useState(false);
   const token = localStorage.getItem("BashApitoken");
   const name = reverseGeneratedName(collection.name);

   const handleDelete = async () => {
      try {
         if (token) {
            const {data} = await Api.delete(
               `/collection/delete/${token}/${name}`
            );
            console.log(data);
         } else {
            throw new Error("Please Login");
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleEdit = async () => {
      setEdit((prev) => !prev);
   };

   return (
      <Div>
         <div>{name}</div>
         <div>Documents: {collection.documentCount}</div>
         <div>
            <button>Data</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
         </div>
         {edit && <EditResource collection={collection} setEdit={setEdit} />}
      </Div>
   );
};

export default Collection;
