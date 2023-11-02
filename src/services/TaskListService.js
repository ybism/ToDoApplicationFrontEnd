import axios from "axios";
const baseUrl = "https://localhost:7166";

export const CreateOneTaskList = (taskList, userId) => {
    
  return axios
    .post(`${baseUrl}/User/CreateOneTaskList/${userId}`, taskList)
    .then((response) => response)
    .catch((error) => {
      // throw error;
      console.log(error)

    });
};


export const GetAllUserTaskLists = (email, password) => {
  const userId = localStorage.getItem('signInUserId');

  return axios
    .get(`${baseUrl}/User/GetAllUserTaskLists/${userId}?id=${userId}`)
    .then((response) => response)
    .catch((error) => {
      // throw error;
      console.log(error)

    });
};
