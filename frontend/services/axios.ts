import axios from "axios";
import { apiVersion } from "../utils/constants";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL + apiVersion,
  withCredentials: true,
});
