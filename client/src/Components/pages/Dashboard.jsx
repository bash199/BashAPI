import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import Collection from "../resources/AllResources";
import NewResource from "../resources/NewResource";

const HomeDiv = styled.div`
   width: 100%;
   height: 100vh;
   display: grid;
   justify-content: center;
`;
const InnerDiv = styled.div`
   max-width: 920px;
   width: 80vw;
   height: 100vh;
   padding: 5px;
   background-color: #dedede;
`;

const Dashboard = () => {
   const [collections, setCollections] = useState([]);
   const [resource, setResource] = useState(false);
   const [token] = useState(localStorage.getItem("BashApitoken"));

   const getCollections = async () => {
      const {data} = await Api.get(`/collection/${token}`);
      setCollections(data);
   };

   useEffect(() => {
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
            <h4>API endpoint</h4>
            {/* <p>{`http://localhost:4000/api/document/${token}/:endpoint`}</p> */}
            {resource && <NewResource setResource={setResource} />}
            {collections.map((collection) => {
               return (
                  <Collection
                     getCollections={getCollections}
                     key={collection._id}
                     collection={collection}
                  />
               );
            })}
         </InnerDiv>
      </HomeDiv>
   );
};

export default Dashboard;
