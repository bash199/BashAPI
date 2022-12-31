import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
// import {useNavigate} from "react-router-dom";
import {Api} from "../../api/Api";
import Collection from "../Collection";
// import {useNavigate} from "react-router-dom";
const HomeDiv = styled.div`
   width: 100%;
   height: 100vh;
   display: grid;
   justify-content: center;
`;
const InnerDiv = styled.div`
   width: 80vw;
   height: 100vh;
   background-color: #dedede;
   display: grid;
`;
const Dashboard = () => {
   const [collections, setCollections] = useState([]);
   // const navigate = useNavigate();
   // const getAuthHeader = () => {
   //    const token = localStorage.getItem("BashApitoken");
   //    console.log(token);
   //    return {
   //       headers: {
   //          Authorization: `Bearer ${token}`,
   //          "Content-Type": "application/json",
   //       },
   //    };
   // };

   useEffect(() => {
      const token = localStorage.getItem("BashApitoken");
      const getCollections = async () => {
         const {data} = await Api.get(`/collection/${token}`);
         console.log(data);
         setCollections(data);
      };
      getCollections();
      return () => {};
      // eslint-disable-next-line
   }, []);

   return (
      <HomeDiv>
         <InnerDiv>
            Dashboard
            {collections.map((collection) => {
               return (
                  <Collection key={collection._id} collection={collection} />
               );
            })}
         </InnerDiv>
      </HomeDiv>
   );
};

export default Dashboard;
