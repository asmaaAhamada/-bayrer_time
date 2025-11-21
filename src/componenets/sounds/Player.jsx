import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function Player({ enabled, sound }) {
  const times = useSelector((state) => state.prayerTimes.data?.timings);
  console.log(times)
  const audioRef = useRef(null);

  useEffect(() => {
    if (!times || !enabled) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(`/azan/${sound}.mp3`);
    }

    const checkPrayerTime = () => {
      const now = new Date();
      const current = now.toTimeString().slice(0, 5);

      const check = (time) => time?.slice(0, 5) === current;

      if (
        check(times.Fajr) ||
        check(times.Dhuhr) ||
        check(times.Asr) ||
        check(times.Maghrib) ||
        check(times.Isha)
      ) {
        audioRef.current.play().catch(() => {
          console.log("🔇 User interaction required to enable audio!");
        });
      }
    };

    const interval = setInterval(checkPrayerTime, 30 * 1000);
    return () => clearInterval(interval);

  }, [enabled, sound, times]);

  return null;
}
