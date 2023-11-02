import axios from "axios";
const baseUrl = "https://localhost:7166";

// https://localhost:7166/User/setphoto?id=1

export const imageUpload = (image, userId) => {
  const formData = new FormData();
  formData.append("image", image);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post(`${baseUrl}/User/setphoto?id=${userId}`, formData, config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
