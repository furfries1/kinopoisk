import axios from "axios";

const instance = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api",
  headers: {
    "X-API-KEY": '8c8e1a50-6322-4135-8875-5d40a5420d86' 
  }
});


export default instance;