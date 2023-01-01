import "./App.css";
import Routes from "../routes/routes";
import Navbar from "./Navbar";
import {useEffect, useState} from "react";

function App() {
   const [token, setToken] = useState(null);
   useEffect(() => {
      const token = localStorage.getItem("BashApitoken");
      setToken(token);
      return () => {};
      // eslint-disable-next-line
   }, []);
   return (
      <div>
         <Navbar token={token} />
         <Routes />
      </div>
   );
}

export default App;
