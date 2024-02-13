import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: "https://codevisualizer.onrender.com/",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

export { CanceledError };
