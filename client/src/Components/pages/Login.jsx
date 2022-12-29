import React, {useState} from "react";
import styled from "@emotion/styled";
import axios from "axios";

const Div = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;
const InnerDiv = styled.div`
   width: 350px;
   height: 500px;
   background-color: #fff;
   border: 2px solid #d9d9d9;
   border-radius: 10px;
   margin-top: 50px;
`;
const H3 = styled.h3`
   font-size: 2rem;
`;

const Login = () => {
   return (
      <Div>
         <H3>SIGN IN</H3>
         <InnerDiv>

         </InnerDiv>
      </Div>
   );
};

export default Login;
