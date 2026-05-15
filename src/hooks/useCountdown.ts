"use client";

import { useEffect, useState } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function getTimeRemaining(target: Date): CountdownResult {
  const total = target.getTime() - Date.now();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isExpired: false };
}

export function useCountdown(target: Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>(() =>
    getTimeRemaining(target)
  );

  useEffect(() => {
    if (timeLeft.isExpired) return;

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(target);
      setTimeLeft(remaining);

      if (remaining.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [target, timeLeft.isExpired]);

  return timeLeft;
}
