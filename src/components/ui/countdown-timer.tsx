"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

export function CountdownTimer({ targetDate, label = "Kết thúc sau" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const blocks = [
    { value: timeLeft.days, label: "Ngày" },
    { value: timeLeft.hours, label: "Giờ" },
    { value: timeLeft.minutes, label: "Phút" },
    { value: timeLeft.seconds, label: "Giây" },
  ];

  return (
    <div className="text-center">
      {label && <p className="text-xs text-muted tracking-wide mb-3">{label}</p>}
      <div className="flex items-center justify-center gap-2">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-2">
            <motion.div
              className="w-14 h-14 bg-foreground text-background flex flex-col items-center justify-center"
              key={block.value}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <span className="text-lg font-medium leading-none">
                {String(block.value).padStart(2, "0")}
              </span>
              <span className="text-[9px] opacity-70 mt-0.5">{block.label}</span>
            </motion.div>
            {i < blocks.length - 1 && <span className="text-foreground font-light text-lg">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
