import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import EditResource from "./EditResource";
import {reverseGeneratedName} from "../../utils/reverseGeneratedName";
import ResourceData from "./ResourceData";

const Div = styled.div`
   width:calc(260px - 20px) ;
   height: 80px;
   padding: 0 5px;
   margin: 10px;
   letter-spacing: 0.8px;
   border-radius: 5px;
   border: 2px solid #eee;
   &:hover {
      border: 2px solid #eee;
      .BtnBox {
         display: flex;
         justify-content: space-around;
         align-items: center;
      }
   }
   @media (max-width: 320px) {
      width:calc(200px - 20px) ;   }
`;
const BtnsBox = styled.div`
   display: none;
   height: 30px;
`;
const Btn = styled.button`
   width: 50px;
   height: 22px;
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

const Collection = ({collection, getCollections,notify}) => {
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
            notify('Deleted Successfully!')
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
            <Btn onClick={handleData}>Data</Btn>
            <Btn onClick={handleEdit}>Edit</Btn>
            <Btn onClick={handleDelete}>Delete</Btn>
         </BtnsBox>
         {edit && <EditResource notify={notify} collection={collection} setEdit={setEdit} />}
         {data && <ResourceData notify={notify} collection={collection} setData={setData} />}
      </Div>
   );
};

export default Collection;
