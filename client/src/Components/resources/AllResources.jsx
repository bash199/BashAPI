import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import EditResource from "./EditResource";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";
import ResourceData from "./ResourceData";
const Div = styled.div`
   width: 270px;
   height: 80px;
   padding: 0 5px;
   margin: 10px;
   letter-spacing: 0.8px;
   border-radius: 5px;
   border: 2px solid transparent;
   &:hover {
      border: 2px solid #eee;

      .BtnBox {
         display: block;
         transition: all 1s ease-in-out;
      }
   }
`;

const BtnsBox = styled.div`
   display: none;

   transition: all 2s ease-out;
`;

const Collection = ({collection, getCollections}) => {
   const [edit, setEdit] = useState(false);
   const [data, setData] = useState(false);
   const token = localStorage.getItem("BashApitoken");
   const name = reverseGeneratedName(collection.name);

   const handleDelete = async () => {
      try {
         if (token) {
            await Api.delete(`/collection/delete/${token}/${name}`);
            console.log("Resource deleted");
            getCollections();
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
         <BtnsBox className="BtnBox">
            <button onClick={handleData}>Data</button>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
         </BtnsBox>
         {edit && <EditResource collection={collection} setEdit={setEdit} />}
         {data && <ResourceData collection={collection} setData={setData} />}
      </Div>
   );
};

export default Collection;
