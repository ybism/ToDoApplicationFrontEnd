import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import Modal from 'react-modal';
import "../styles/AddToDo.css";


const baseUrl = 'https://localhost:7166';

const ImageUpload = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageBlob, setImageBlob] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem('signInUserId');

  const openModal = () => {
    setModalIsOpen(true);
    retrieveProfilePhoto(userId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const retrieveProfilePhoto = (userId) => {
    axios
      .get(`${baseUrl}/User/retrieveProfilePhoto/${userId}`, {
        responseType: 'blob',
      })
      .then((response) => {
        setImageBlob(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving profile photo:', error);
      });
  };

  const handleImageUpload = () => {
    console.log(userId);
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      axios
        .post(`${baseUrl}/User/setphoto?id=${userId}`, formData, config)
        .then((response) => {
          retrieveProfilePhoto(userId);
          closeModal();
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div>

      <Button type="primary" className="btn-container" onClick={openModal}>Open Image Upload</Button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {imageBlob ? (
          <img src={URL.createObjectURL(imageBlob)} alt="User Profile" />
        ) : (
          <div>No image found.</div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Button type="primary" className="btn-container" onClick={handleImageUpload}>Upload</Button>
        <Button type="primary" className="btn-container" onClick={closeModal}>Close</Button>
      </Modal>
    </div>
  );
};

export default ImageUpload;