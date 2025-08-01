import { useState, useEffect } from 'react';

export const useHappyHour = () => {
  const [isHappyHour, setIsHappyHour] = useState(false);
  const [happyHourInfo, setHappyHourInfo] = useState({
    isActive: false,
    timeRemaining: '',
    discount: '25% off all drinks',
    startTime: '17:00',
    endTime: '19:00'
  });

  useEffect(() => {
    const checkHappyHour = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour + currentMinute / 60;

      // Happy hour: 5 PM to 7 PM (17:00 - 19:00)
      const happyHourStart = 17;
      const happyHourEnd = 19;

      const isActive = currentTime >= happyHourStart && currentTime < happyHourEnd;
      
      let timeRemaining = '';
      if (isActive) {
        const endTime = new Date();
        endTime.setHours(happyHourEnd, 0, 0, 0);
        const diff = endTime.getTime() - now.getTime();
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timeRemaining = `${hoursLeft}h ${minutesLeft}m remaining`;
      } else if (currentTime < happyHourStart) {
        const startTime = new Date();
        startTime.setHours(happyHourStart, 0, 0, 0);
        const diff = startTime.getTime() - now.getTime();
        const hoursUntil = Math.floor(diff / (1000 * 60 * 60));
        const minutesUntil = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        timeRemaining = `Starts in ${hoursUntil}h ${minutesUntil}m`;
      }

      setIsHappyHour(isActive);
      setHappyHourInfo({
        isActive,
        timeRemaining,
        discount: '25% off all drinks',
        startTime: '17:00',
        endTime: '19:00'
      });
    };

    checkHappyHour();
    const interval = setInterval(checkHappyHour, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return { isHappyHour, happyHourInfo };
};