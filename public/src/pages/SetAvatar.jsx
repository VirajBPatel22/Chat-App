import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';

function SetAvatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      console.log("User object:", user); // Debugging log

      const userId = user._id; // Assuming _id is now a string
      console.log("User ID:", userId); // Debugging log

      if (!userId) {
        toast.error("User ID not found. Please log in again.", toastOptions);
        return;
      }

      try {
        const { data } = await axios.post(`${setAvatarRoute}/${userId}`, {
          image: avatars[selectedAvatar],
        });

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate('/');
        } else {
          toast.error("Error setting avatar. Please try again", toastOptions);
        }
      } catch (error) {
        toast.error("Failed to set avatar. Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        try {
          const response = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          data.push(response.data);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Adding a delay of 1 second
        } catch (error) {
          if (error.response && error.response.status === 429) {
            console.error('Rate limit exceeded. Retrying...');
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
            i--; // Decrement the counter to retry the request
          } else {
            console.error(error);
            toast.error("Failed to load avatars. Please try again later.", toastOptions);
          }
        }
      }
      setAvatars(data);
      setLoading(false);
    };
    fetchAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className='loader' />
        </Container>
      ) : (
        <Container>
          <div className='title-container'>
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className='avatars'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml,${encodeURIComponent(avatar)}`}
                  alt="avatar"
                />
              </div>
            ))}
          </div>
          <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
