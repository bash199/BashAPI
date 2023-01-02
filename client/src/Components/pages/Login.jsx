import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {useNavigate} from "react-router-dom";
import "../App.css";
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
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   const navigate = useNavigate();
   const Clickhandle = async (event) => {
      event.preventDefault();
      try {
         if (!inputs.email || !inputs.password)
            throw new Error("Please fill the fields");
         const {data} = await Api.post("/user/login", inputs);
         // console.log(data);
         localStorage.setItem("BashApitoken", data.token);
         navigate("/");
         setInputs({
            email: "",
            password: "",
         });
      } catch (error) {
         console.log(error);
         console.log(error.response.data);
      }
   };

   const handleInputChange = async ({target: {name, value}}) => {
      setInputs((prev) => {
         return {...prev, [name]: value};
      });
   };

   return (
      <Div>
         <H3>SIGN IN</H3>
         <InnerDiv>
            <div className="inputGroup">
               <input onChange={handleInputChange} name="email" type="text" />
               <label>Email</label>
            </div>
            <div className="inputGroup">
               <input
                  onChange={handleInputChange}
                  name="password"
                  type="text"
               />
               <label>Password</label>
            </div>
            <button onClick={Clickhandle}>Login</button>
         </InnerDiv>
      </Div>
   );
};

export default Login;
