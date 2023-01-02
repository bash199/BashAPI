import "./App.css";
import Routes from "../routes/routes";
import Navbar from "./Navbar";
import {useEffect, useState} from "react";

function App() {
   const [token, setToken] = useState(localStorage.getItem("BashApitoken"));
   useEffect(() => {
      setToken(localStorage.getItem("BashApitoken"));
      return () => {};
      // eslint-disable-next-line
   }, [token]);
   return (
      <div>
         <Navbar setToken={setToken} token={token} />
         <Routes />
      </div>
   );
}

export default App;
