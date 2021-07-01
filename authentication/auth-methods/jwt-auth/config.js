import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.BACKEND_URL, //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});
