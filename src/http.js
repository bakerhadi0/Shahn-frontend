import axios from "axios";
const http=axios.create({baseURL:import.meta.env.VITE_API_BASE||"https://shahn-server.onrender.com"});
http.interceptors.request.use(c=>{const t=localStorage.getItem("token");if(t)c.headers.Authorization=`Bearer ${t}`;return c;});
export default http;
