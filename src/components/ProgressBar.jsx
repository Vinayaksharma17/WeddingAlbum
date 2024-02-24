import React, { useState, useEffect } from "react";
import { LinearProgress, Avatar } from "@mui/material";
import Confetti from "react-confetti";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const updateScrollProgress = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
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
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  const avatarLeftPosition = `${scrollProgress / 2.1}%`;
  const avatarRightPosition = `${99 - scrollProgress / 2}%`;

  return (
    <>
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
          direction: "rtl",
        }}
      />
      <Avatar
        sx={{
          position: "fixed",
          left: avatarLeftPosition,
          top: "10px", // Adjust the vertical positioning as needed
        }}
      >
        <img
          src="https://img.freepik.com/premium-vector/cute-little-girl-measure-length-using-foot-step_97632-6172.jpg?w=740"
          alt="Left Avatar"
        />
      </Avatar>
      <Avatar
        sx={{
          position: "fixed",
          left: avatarRightPosition,
          top: "10px", // Adjust the vertical positioning as needed
        }}
      >
        <img
          src="https://img.freepik.com/premium-vector/cartoon-little-boy-summer-clothing-waving-hand_353337-444.jpg?w=360"
          alt="Right Avatar"
        />
      </Avatar>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
    </>
  );
};

export default ProgressBar;
