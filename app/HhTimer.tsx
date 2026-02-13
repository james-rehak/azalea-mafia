"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function getNextFriday6pm(now: Date) {
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7; // If today is Friday, go to next Friday
  const nextFriday = new Date(now);
  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(18, 0, 0, 0); // 6pm
  return nextFriday;
}

function getTimeRemaining(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function getRandomPoint():number {
  return 0.3 + Math.random() * 0.7;
}

function isValentinesDay(): boolean {
  const now = new Date();
  return now.getMonth() === 1 && now.getDate() >= 12 && now.getDate() <= 16; // February 14th Weekend
}

export default function HhTimer() {
  // Initialize with zeros to avoid SSR/client mismatch
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const scalar = 10;
  const heart = confetti.shapeFromText({ text: '❤️', scalar });
  const flower = confetti.shapeFromText({ text: '🌷', scalar });


  useEffect(() => {
    const updateCountdown = () => {
      const nextFriday = getNextFriday6pm(new Date());
      setRemaining(getTimeRemaining(nextFriday));
    };
    updateCountdown(); // Set initial value on client
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-6 px-4 mx-auto cursor-pointer"
      onClick={() => {
        Array.from({ length: 3 }).forEach((_, i) => {
          setTimeout(() => {
            confetti({
              particleCount: 220,
              spread: 120 + (i * 25),
              origin: { x: getRandomPoint(), y: getRandomPoint() },
              shapes: isValentinesDay() ? [heart, heart, flower] : undefined,
            });
          }, i * 500);
        });
      }}
      title="🎉"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
        Countdown to Happy Hour!
      </h2>
      <div className="text-2xl font-mono text-green-900 mb-2 text-center">
        <div className="whitespace-nowrap">
          {remaining.days} Days <span className={remaining.hours > 12 ? "font-extrabold" : ""}>{remaining.hours} Hours</span>
        </div>
        <div className="whitespace-nowrap">
          {remaining.minutes} Minutes {remaining.seconds} Seconds
        </div>
      </div>
    </div>
  );
}
