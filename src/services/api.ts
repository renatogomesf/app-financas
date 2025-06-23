import axios from "axios";

const api = axios.create({
  baseURL: `http://${process.env.API_LINK}:3333`,
});
export default api;
