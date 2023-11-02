import axios from "axios";
const baseUrl = "https://localhost:7166";



export const CreateOneTask = (task, userId, TaskListId) => {
  
  return axios
    .post(`${baseUrl}/User/CreateOneTask/${userId}/${TaskListId}`, task)
    .then((response) => response)
    .catch((error) => {
      // throw error;
      console.log(error)
    });
};

export const EditTaskForUser = (userId, taskId) => {
  return axios
    .patch(`${baseUrl}/User/EditTaskForUser/${userId}/${taskId}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error)
    });
};

export const GetAllUserTasks = () => {
  const userId = localStorage.getItem('signInUserId');

  return axios
    .get(`${baseUrl}/User/GetAllUserTasks/${userId}?id=${userId}`)
    .then((response) => response)
    .catch((error) => {
      // throw error;
      console.log(error)
    });
};
// https://localhost:7166/User/GetStatusCounts/1

export const GetStatusCounts = () => {
  const userId = localStorage.getItem('signInUserId');

  return axios
    .get(`${baseUrl}/User/GetStatusCounts/${userId}`)
    .then((response) => response)
    .catch((error) => {
      // throw error;
      console.log(error)
    });
};

