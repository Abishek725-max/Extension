import React, { useState, useEffect } from "react";

const TimeCounter = ({ targetDate }) => {
  //   console.log('🚀 ~ TimeCounter ~ targetDate:', targetDate);
  // State to store the remaining time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the remaining time
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const timeRemaining = new Date(targetDate) - now;

    if (timeRemaining <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    // Update the counter every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]);

  // Displaying the time left without leading zeros
  return (
    <div className="flex items-center">
      <p className="font-md font-[12px] text-[#fff]">Next Claim in : </p>

      <p className="font-md font-[12px] text-yellow">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours > 0 && `${timeLeft.hours}h `}
        {timeLeft.minutes > 0 && `${timeLeft.minutes}m `}
        {timeLeft.seconds > 0 && `${timeLeft.seconds}s`}
      </p>
    </div>
  );
};

export default TimeCounter;
