import React from "react";
import {Link} from "react-router-dom";
import {HomeDiv, InnerDiv, TextBox} from "./Docs";

const ErrorPage = () => {
   return (
      <HomeDiv>
         <InnerDiv>
            <TextBox style={{textAlign: "center", backgroundColor: "white"}}>
               <h1>404 Not Found</h1>
               <p>We could not find what you were looking for.</p>
               <Link to={"/"}>GO Back</Link>
            </TextBox>
         </InnerDiv>
      </HomeDiv>
   );
};
export default ErrorPage;
