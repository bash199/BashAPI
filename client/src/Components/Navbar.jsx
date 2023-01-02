import React, {useEffect} from "react";
import styled from "@emotion/styled";
import {Link, useNavigate} from "react-router-dom";
import "./navbar.css";
import {Api} from "../api/Api";
import {useState} from "react";

const NavBox = styled.nav`
   width: 100%;
   height: 45px;
   background-color: #d9d9d9;
   display: flex;
   justify-content: center;
`;
const InnerBox = styled.div`
   width: 80%;
   height: 100%;
   background-color: #d9d9d9;
   display: flex;
   justify-content: space-between;
`;
const LeftBox = styled.div`
   width: 100px;
   height: 100%;
   background-color: #d9d9d9;
   display: flex;
   justify-content: space-between;
`;
// const LogoBox = styled.div`
//    width: 70px;
//    height: 100%;
//    background-color: #c4c4c4;
//    text-align: center;
//    display: grid;
//    align-items: center;
//  `;
// const Login = styled.div`
//    width: 60px;
//    height: 100%;
//    background-color: #c4c4c4;
//    text-align: center;
//    display: grid;
//    align-items: center;
// `;

const Navbar = ({token,setToken}) => {
   const [state, setState] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      setState(show());
      // eslint-disable-next-line
   }, [token]);

   const handleLogout = async () => {
      try {
         await Api.post(`/user/logout/${token}`);
         localStorage.removeItem("BashApitoken");
         setToken(null)
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   const show = () => {
      if (!token) {
         return (
            <LeftBox>
               <Link to={"/register"}>Register</Link>
               <Link to={"/login"}>Login</Link>
            </LeftBox>
         );
      }
      return (
         <LeftBox>
            <button onClick={handleLogout}>Logout</button>
         </LeftBox>
      );
   };

   return (
      <NavBox>
         <InnerBox>
            <LeftBox>
               <Link to={"/"}>Home</Link>
               <Link to={"/docs"}>Docs</Link>
            </LeftBox>
            {state}
         </InnerBox>
      </NavBox>
   );
};

export default Navbar;
