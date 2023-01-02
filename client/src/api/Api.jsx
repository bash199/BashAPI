import axios from "axios";
let url = "http://localhost:4000/api";

if (process.env.NODE_ENV === "production") {
   url = "/api";
}

export const Api = axios.create({
   baseURL: url,
});
