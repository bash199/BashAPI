import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import Collection from "../Collection";
import NewResource from "../resources/NewResource";

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
`;

const Dashboard = () => {
   const [collections, setCollections] = useState([]);
   const [resource, setResource] = useState(false);

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
            <button onClick={() => setResource((prev) => !prev)}>
               New Resource
            </button>
            {resource && <NewResource setResource={setResource} />}
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
