"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

function getNextFriday6pm(now: Date) {
  const dayOfWeek = now.getDay(); // 0=Sun, 1=Mon, ..., 5=Fri, 6=Sat
  const nextFriday = new Date(now);
  if (dayOfWeek === 5) { // Today is Friday
    if (now.getHours() < 18 || (now.getHours() === 18 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
      // Before or exactly at 6pm today, target today at 6pm
      nextFriday.setHours(18, 0, 0, 0);
      return nextFriday;
    } else {
      // After 6pm, stop the counter (show zero)
      return null;
    }
  } else {
    // Not Friday, find next Friday
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7;
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    nextFriday.setHours(18, 0, 0, 0);
    return nextFriday;
  }
}

function getTimeRemaining(target: Date | null) {
  if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const now = getNow();
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
  return now.getMonth() === 1 && now.getDate() > 12 && now.getDate() < 16; // February 14th Weekend
}

// Helper to get test date from URL or env 2026-02-06T17:30:00
function getNow(): Date {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const testDate = params.get("testDate");
    if (testDate) {
      const parsed = new Date(testDate);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  }
  // fallback to real time
  return new Date();
}

export default function HhTimer() {
  // Initialize with zeros to avoid SSR/client mismatch
  const [remaining, setRemaining] = useState({ days: -1, hours: 0, minutes: 0, seconds: 0 });

  const scalar = 5;


  useEffect(() => {
    const updateCountdown = () => {
      const now = getNow();
      const nextFriday = getNextFriday6pm(now);
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
              shapes: isValentinesDay() ? [
                confetti.shapeFromText({ text: '❤️', scalar }),
                confetti.shapeFromText({ text: '❤️', scalar }),
                confetti.shapeFromText({ text: '🌷', scalar })
              ] : undefined,
              scalar: isValentinesDay() ? scalar : undefined,
            });
          }, i * 500);
        });
      }}
      title="🎉"
    >
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center">
        Countdown to Happy Hour!
      </h2>
      {remaining.days === -1 ? (
        <div className="text-5xl font-mono text-center">👀</div>
      ) : (
        <div className="text-2xl font-mono text-green-900 mb-2 text-center">
          {remaining.days === 0 &&
          remaining.hours === 0 &&
          remaining.minutes === 0 &&
          remaining.seconds === 0 ? (
            <h3>It&#39;s Happy Hour! 🍸</h3>
          ) : (
            <div className="">
              <div className="whitespace-nowrap">
                {remaining.days} Days <span
                className={remaining.hours > 12 ? "font-extrabold" : ""}>{remaining.hours} Hours</span>
              </div>
              <div className="whitespace-nowrap">
                {remaining.minutes} Minutes {remaining.seconds} Seconds
              </div>
            </div>
          )}
        </div>
      )}


    </div>
  );
}
