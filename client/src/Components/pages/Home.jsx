import React, {useEffect} from "react";
import styled from "@emotion/styled";
import {Link, useNavigate} from "react-router-dom";
import "../App.css";
import {Btn2} from "../resources/NewResource";
const HomeDiv = styled.div`
   width: 100%;
   height: calc(100vh - 45px);
   display: grid;
   justify-content: center;
`;

const InnerDiv = styled.div`
   max-width: 920px;
   width: 80vw;
   height: 40vh;
   display: flex;
   justify-content: center;
   align-items: center;
`;
const TextBox = styled.div`
   text-align: center;
`;

const Home = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("BashApitoken");
      if (!token) return navigate("/");
      navigate("/dashboard");

      return () => {};
      // eslint-disable-next-line
   }, []);

   return (
      <HomeDiv>
         <InnerDiv>
            <TextBox>
               <h2>bashapi.com</h2>
               <p>
                  The easiest way to mock REST APIs! (Check out{" "}
                  <Link id="aa" to={"/docs"}>
                     docs
                  </Link>
                  )
               </p>
               <Link to={"/login"}>
                  <Btn2>Get Started</Btn2>
               </Link>
            </TextBox>
         </InnerDiv>
      </HomeDiv>
   );
};

export default Home;
