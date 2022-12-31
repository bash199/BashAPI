import React, {useEffect} from "react";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
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
const Home = () => {
   // const [first, setfirst] = useState(null);
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
         <InnerDiv>Home</InnerDiv>
      </HomeDiv>
   );
};

export default Home;
