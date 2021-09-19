import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  headers: {
    "Access-Control-Allow-Origin": "https://pokestore-rho.vercel.app/",
  },
});

export default api;
