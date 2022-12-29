import React from "react";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import "./navbar.css";

const NavBox = styled.nav`
   width: 100%;
   height: 45px;
   background-color: #D9D9D9;
   display: flex;
   justify-content: center;
`;
const InnerBox = styled.div`
   width: 80%;
   height: 100%;
   background-color: #D9D9D9;
   display: flex;
   justify-content: space-between;
`;
const LeftBox = styled.div`
   width: 100px;
   height: 100%;
   background-color: #D9D9D9;
   display: flex;
   justify-content: space-between;
`;
const LogoBox = styled.div`
   width: 70px;
   height: 100%;
   background-color: #c4c4c4;
   text-align: center;
   display: grid;
   align-items: center;
`;
const Login = styled.div`
   width: 60px;
   height: 100%;
   background-color: #c4c4c4;
   text-align: center;
   display: grid;
   align-items: center;
`;

const Navbar = () => {
   return (
      <NavBox>
         <InnerBox>
            <LeftBox>
               <Link to={"/"}>Home</Link>
               <Link to={"/docs"}>Docs</Link>
            </LeftBox>
            <LeftBox>
               <Link to={"/register"}>Register</Link>
               <Link to={"/login"}>Login</Link>
            </LeftBox>
         </InnerBox>
      </NavBox>
   );
};

export default Navbar;
