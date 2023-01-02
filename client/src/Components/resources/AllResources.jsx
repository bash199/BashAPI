import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import EditResource from "./EditResource";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";
import ResourceData from "./ResourceData";
const Div = styled.div`
   width: 50%;
   height: 80px;
   padding: 0 10px 0 10px;
   margin: 10px;
   background-color: aliceblue;
`;

const Collection = ({collection,getCollections}) => {
   const [edit, setEdit] = useState(false);
   const [data, setData] = useState(false);
   const token = localStorage.getItem("BashApitoken");
   const name = reverseGeneratedName(collection.name);

   const handleDelete = async () => {
      try {
         if (token) {
            await Api.delete(`/collection/delete/${token}/${name}`);
            console.log("Resource deleted");
            getCollections()
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
   const handleData = async () => {
      setData((prev) => !prev);
   };

   return (
      <Div>
         <div>{name}</div>
         <div>Documents: {collection.documentCount}</div>
         <div>
            <button onClick={handleData}>Data</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
         </div>
         {edit && <EditResource collection={collection} setEdit={setEdit} />}
         {data && <ResourceData collection={collection} setData={setData} />}
      </Div>
   );
};

export default Collection;
