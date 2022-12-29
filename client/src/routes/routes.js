import React from "react";
import {Routes as AllRoutes, Route} from "react-router-dom";
import Docs from "../Components/pages/Docs";
import Home from "../Components/pages/Home";
import Login from "../Components/pages/Login";
import Register from "../Components/pages/Register";

const routes = () => {
   return (
      <div>
         <AllRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </AllRoutes>
      </div>
   );
};

export default routes;
