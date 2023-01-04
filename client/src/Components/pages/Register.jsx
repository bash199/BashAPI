import React, {useState} from "react";
import styled from "@emotion/styled";
import {Api} from "../../api/Api";
import {useNavigate} from "react-router-dom";
const Div = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
`;
const InnerDiv = styled.div`
   width: 340px;
   height: 300px;
   background-color: #fff;
   border: 2px solid #d9d9d9;
   border-radius: 10px;
   margin-top: 50px;
   padding: 10px;
   display: flex;
   align-items: center;
   flex-direction: column;
`;
const InputsBox = styled.div`
   width: 80%;
   height: 255px;
   border-bottom: 2px solid rgba(0, 0, 0, 0.1);
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
`;
const InputContainer = styled.div`
   width: 100%;
   height: 50px;
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
`;

const LoginBtn = styled.button`
   width: 100%;
   height: 33px;
   background-color: #2b353d84;
   color: white;
   font-size: 15px;
   border-radius: 6px;
   border: none;
   cursor: pointer;
   &:active {
      transform: scale(0.98);
      transition: all 0.1s ease-in;
   }
`;

const Input = styled.input`
   border-style: solid;
   width: 95%;
   font-weight: 600;
   font-size: 17px;
   padding: 5px 7px;
   border-width: 2px;
   border-radius: 5px;
   color: #8a8a8a;

   background-color: #eee;
   border: none;
   margin-top: 8px;
   &:focus {
      outline-color: #2196f3;
      outline-offset: 3px;
      transition: all 0.1s ease-in-out;
   }
`;
const H3 = styled.h1`
   font-size: 2rem;
   color: #333333;
`;
const Docs = styled.div`
   color: #333;
   text-align: center;
   font-size: 13px;
`;
const ErrorMessage = styled.div`
   height: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #333;
   font-weight: 600;
   text-align: center;
   font-size: 0.9rem;
`;
const Register = () => {
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   const [error, setError] = useState(null);
   const [pass, setPass] = useState("null");

   const navigate = useNavigate();
   const Clickhandle = async (event) => {
      event.preventDefault();
      try {
         if (!inputs.email || !inputs.password || !pass) {
            return;
         }
         if (inputs.password !== pass) {
            return setError("Passwords Doesn't Match");
         }
         await Api.post("/user/register", inputs);
         navigate("/login");
         setInputs({
            email: "",
            password: "",
         });
      } catch (error) {
         const {data, status} = error.response;
         if (
            data ===
               "User validation failed: email: must be valid Email links" &&
            status === 400
         ) {
            return setError("must be valid Email");
         }
         console.log(error.response);
         setError(error.response.data);
      }
   };

   const handleInputChange = async ({target: {name, value}}) => {
      setInputs((prev) => {
         return {...prev, [name]: value};
      });
   };

   return (
      <Div>
         <H3>Sign up</H3>
         <InnerDiv>
            <InputsBox>
               <InputContainer>
                  <label style={{fontWeight: 600}} htmlFor="email">
                     Email
                  </label>
                  <Input
                     onChange={handleInputChange}
                     placeholder="..."
                     id="email"
                     name="email"
                     type="text"
                  />
               </InputContainer>
               <InputContainer>
                  <label style={{fontWeight: 600}} htmlFor="password">
                     Password
                  </label>
                  <Input
                     placeholder="..."
                     onChange={handleInputChange}
                     name="password"
                     type="password"
                  />
               </InputContainer>
               <InputContainer>
                  <label style={{fontWeight: 600}} htmlFor="password">
                     Confirm Password
                  </label>
                  <Input
                     placeholder="..."
                     onChange={({target: {value}}) => {
                        setPass(value);
                     }}
                     name="password"
                     type="password"
                  />
               </InputContainer>
               <LoginBtn onClick={Clickhandle}>Login</LoginBtn>
            </InputsBox>
            <ErrorMessage>
               <Docs>{error}</Docs>
            </ErrorMessage>
         </InnerDiv>
      </Div>
   );
};

export default Register;
