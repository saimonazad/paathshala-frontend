import axios from "axios";

export const httpClient = axios.create({
  baseURL: `https://paathshala.staging.baeinnovations.com/`, //YOUR_API_URL HERE
  headers: {
    "Content-Type": "application/json",
  },
});
