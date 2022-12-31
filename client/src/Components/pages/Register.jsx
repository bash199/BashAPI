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
const Register = () => {
   const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
   });
   const navigate = useNavigate();
   const Clickhandle = async (event) => {
      event.preventDefault();
      try {
         if (!inputs.email || !inputs.password || !inputs.name)
            throw new Error("Please fill all fields");
         await Api.post("/user/register", inputs);
         navigate("/login");

         setInputs({
            name: "",
            email: "",
            password: "",
         });
      } catch (error) {
         const {data, status} = error.response;
         if (
            data ===
               "User validation failed: email: must be valid Email links, password: Path `password` (`d`) is shorter than the minimum allowed length (6)." &&
            status === 400
         ) {
            return console.log("must be valid Email");
         }
         console.log(error.message);
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
         <H3>Register</H3>
         <InnerDiv>
            <div>
               <label>Name</label>
               <input
                  onChange={handleInputChange}
                  placeholder="..."
                  name="name"
                  type="text"
               />
               <label>Email</label>
               <input
                  onChange={handleInputChange}
                  placeholder="..."
                  name="email"
                  type="text"
               />
               <label>Password</label>
               <input
                  onChange={handleInputChange}
                  placeholder="..."
                  name="password"
                  type="text"
               />
               <button onClick={Clickhandle}>Sgin Up</button>
            </div>
         </InnerDiv>
      </Div>
   );
};

export default Register;
