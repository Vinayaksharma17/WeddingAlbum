import React, { useState, useEffect } from "react";
import { LinearProgress, Avatar } from "@mui/material";
import Confetti from "react-confetti";
import image from '../assets/vai.jpg';
import jiju_ok from '../assets/jiju_ok.jpg';
import style from './progressBar.css';

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScrollProgress = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / documentHeight) * 100;
    setScrollProgress(progress);

    // Check if both avatars are close to each other
    if (progress >= 49 && progress <= 51) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollProgress);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate the avatar positions dynamically based on the screen width and scroll progress
  const avatarSpacing = screenWidth > 600 ? 4 : 0.5; // Adjust spacing based on screen size
  const avatarLeftPosition = `${Math.min(scrollProgress / 2.1, screenWidth > 600 ? 55 : 45 - avatarSpacing)}%`;
  const avatarRightPosition = `${Math.max(100 - scrollProgress / 2, screenWidth > 600 ? 45 : 55 + avatarSpacing)}%`;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <LinearProgress
        variant="determinate"
        value={scrollProgress}
        sx={{ position: "fixed", top: 0, left: 0, width: "50%" }}
      />
      <LinearProgress
        variant="determinate"
        value={scrollProgress}
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "50%",
          transform: "rotateY(180deg)",
        }}
      />
      <Avatar
        sx={{
          position: "fixed",
          left: avatarLeftPosition,
          top: "10px",
        }}
      >
        <img src={jiju_ok} alt="Left Avatar" />
      </Avatar>
      <Avatar
        sx={{
          position: "fixed",
          left: avatarRightPosition,
          top: "10px",
        }}
      >
        <img src={image} alt="Right Avatar" />
      </Avatar>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
    </div>
  );
};

export default ProgressBar;