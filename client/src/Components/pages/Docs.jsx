import React from "react";
import styled from "@emotion/styled";
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
const Docs = () => {
   return (
      <HomeDiv>
         <InnerDiv>Docs</InnerDiv>
      </HomeDiv>
   );
};

export default Docs;
