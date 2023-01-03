import React, {useEffect} from "react";
import styled from "@emotion/styled";
import {Link, useNavigate, useLocation} from "react-router-dom";
import "./navbar.css";
import {Api} from "../api/Api";
import {useState} from "react";

const NavBox = styled.nav`
   width: 100%;
   height: 45px;
   background-color: #fafafa;
   display: flex;
   justify-content: center;
`;

const InnerBox = styled.div`
   max-width: 920px;
   width: 80vw;
   height: 100%;
   padding: 0 0 0 5px;
   background-color: #fafafa;
   display: flex;
   justify-content: space-between;
`;

const LeftBox = styled.div`
   width: 90px;
   height: 100%;
   background-color: #fafafa;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const RightBox = styled.div`
   width: 90px;
   height: 100%;
   background-color: #fafafa;
   display: flex;
   justify-content: flex-end;
   align-items: center;
`;
const Logo = styled.div`
   width: 30px;
   height: 36px;
   background-color: #333;
   box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
   padding: 2px 5px;
   border-radius: 6px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   color: white;
`;
const Small = styled.div`
   font-size: 14px;
   color: #a0aec0;
   text-align: center;
`;
const Large = styled.div`
   letter-spacing: 1px;
   color: #fff;
   text-align: center;
`;
const Docs = styled.div`
   color: #333;
   text-align: center;
   text-decoration: none;
   cursor: pointer;
`;

const Navbar = ({token, setToken}) => {
   const [state, setState] = useState(null);
   const navigate = useNavigate();
   let {pathname} = useLocation();
   useEffect(() => {
      setToken(localStorage.getItem("BashApitoken"));
      setState(show());
      // eslint-disable-next-line
   }, [pathname]);

   const handleLogout = async () => {
      try {
         await Api.post(`/user/logout/${token}`);
         localStorage.removeItem("BashApitoken");
         setToken(null);
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   const show = () => {
      if (!token) {
         return (
            <RightBox>
               <Link to={"/login"}>
                  <Docs>Login</Docs>
               </Link>
            </RightBox>
         );
      }
      return (
         <RightBox>
            <Docs onClick={handleLogout}>Logout</Docs>
         </RightBox>
      );
   };

   return (
      <NavBox>
         <InnerBox>
            <LeftBox>
               <Link to={"/"}>
                  <Logo>
                     <Small>Bash</Small>
                     <Large>API</Large>
                  </Logo>
               </Link>
               <Link to={"/docs"}>
                  <Docs>Docs</Docs>
               </Link>
            </LeftBox>
            {state}
         </InnerBox>
      </NavBox>
   );
};

export default Navbar;
