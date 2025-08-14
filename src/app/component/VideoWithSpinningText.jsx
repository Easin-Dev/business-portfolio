"use client";
import { useState, useRef, useEffect } from "react";

export default function VideoWithSpinningText() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section className="w-full py-20 lg:py-32 bg-white rounded-t-4xl bg-[radial-gradient(theme(colors.gray.200)_1px,transparent_1px)] [background-size:20px_20px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* উপরের লেখা */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">
            Why Choose Us
          </span>
          {/* 👇 dark:text-white ক্লাসটি এখান থেকে সরিয়ে দেওয়া হয়েছে */}
          <h2 className="mt-4 text-4xl  tracking-tight text-black sm:text-6xl">
            <span className="font-bold">Why Us? Because Your</span>
            <br />
            <span className="text-blue-500 font-serif italic">Growth Is Our Mission</span>
          </h2>
        </div>

        {/* ভিডিও এবং স্পিনিং বাটন কন্টেইনার */}
        <div
          onClick={handleToggleMute}
          className="relative mt-16 max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* ব্যাকগ্রাউন্ড ভিডিও */}
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="https://raw.githubusercontent.com/designmonks/DM-Showreel/main/Showreel%202024%20Cov%20.mp4"
            autoPlay
            loop
            muted // ডিফল্টভাবে সাউন্ড ছাড়া চলবে
            playsInline
          ></video>

          {/* ঘোরানো প্লে বাটন (মসৃণ অ্যানিমেশনসহ) */}
          <div
            className={`absolute inset-0 m-auto flex items-center justify-center w-28 h-28 z-10 pointer-events-none 
                         transition-all duration-500 ease-in-out 
                         ${isMuted
                ? "opacity-100 scale-100"
                : "opacity-0 scale-75"
              }`}
          >
            <img
              src="https://cdn.prod.website-files.com/672a72b52eb5f37692d645a9/67ae30449566892a169fa179_Video%20Play%5D%20(2).svg"
              alt="Play Video"
              className="spinning-play-button"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .spinning-play-button {
          width: 100%;
          height: 100%;
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

