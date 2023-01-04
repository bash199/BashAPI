import React from "react";
import styled from "@emotion/styled";

export const HomeDiv = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
`;

export const InnerDiv = styled.div`
   max-width: 920px;
   width: 80vw;
   height: 100vh;
`;

export const TextBox = styled.div`
   width: calc(100% - 20px);
   height: 100px;
   background-color: #eeeeee;
   padding: 5px 10px;
   border-radius: 4px;
   margin-top: 20px;
   & > h4 {
      margin: 5px 0;
   }
   & > p {
      font-size: 14px;
   }
   @media (max-width: 540px) {
      height: 190px;
   }
   @media (max-width: 350px) {
      width: calc(250px - 20px);
   }
`;
export const GettingStarted = styled.div`
   width: calc(100%);
   height: 100px;
   margin-top: 20px;
`;

const Docs = () => {
   return (
      <HomeDiv>
         <InnerDiv>
            <TextBox>
               <h4>WHAT IS BashAPI?</h4>
               <p>
                  BashAPI is a simple tool that lets you easily mock up APIs
                  preform operations on it using RESTful interface. BashAPI is
                  meant to be used as learning tool.
               </p>
            </TextBox>
            <GettingStarted>
               <h4>GETTING STARTED</h4>
               <p>1. Create new resource</p>
               <p>2. Define your schema</p>
               <p>
                  3. Copy Your unieqe API Endpoine & add to it the resource name
                  (:endpoint)
               </p>
               <p>4.Enjoy our service.</p>
            </GettingStarted>
         </InnerDiv>
      </HomeDiv>
   );
};

export default Docs;
