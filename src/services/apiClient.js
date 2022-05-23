import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient (ctx) {
  const  { "bibliokeia.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:8000",
    //baseURL: "http://172.21.214.56:8000"
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    
    //console.log('TOKEN CONTEXT: ', api.defaults.headers)
  }

  return api;
}
