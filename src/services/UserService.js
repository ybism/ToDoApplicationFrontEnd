import axios from "axios";
const baseUrl = "https://localhost:7166";

export const createUser = (user) => {
  return axios
    .post(`${baseUrl}/User/createUser`, user)
    .then((response) => response.data)
    .catch((error) => {
      // throw error;
      console.log(error)
    });
};

export const userLogin = (email, password) => {
  return axios
    .get(`${baseUrl}/User/loginUser/${email}/${password}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    });
};
