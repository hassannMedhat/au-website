"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useSpring, animated } from "@react-spring/web";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Cookies from "js-cookie";
import Image from "next/image";

// Hero Section
const HeroSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.log("خطأ في تشغيل الفيديو:", error);
      });

      const handleTimeUpdate = () => {
        if (video.currentTime >= 60) {
          video.currentTime = 0;
        }
        setCurrentSeconds(video.currentTime);
        setProgress(video.currentTime / 60);
      };

      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleButtonClick = () => {
    new Audio("path/to/rev-engine.mp3").play(); // تشغيل الصوت
    setIsPopupOpen(true); // فتح الـ pop-up
  };

  const closePopup = () => {
    setIsPopupOpen(false); // إغلاق الـ pop-up
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* خلفية الفيديو */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          preload="metadata"
          className="absolute inset-0 w-full h-full min-w-full min-h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/diwavsksm/video/upload/f_auto,q_auto/v1741962956/intro_poyq5n.mp4"
            type="video/mp4"
          />
          متصفحك لا يدعم الفيديو.
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

      {/* ✅ زرار فتح الكارد */}
      <button
        onClick={() => setShowCard(!showCard)}
        className="absolute top-5 left-5 md:top-10 md:left-10 p-3 md:p-4 bg-white/30 backdrop-blur-lg shadow-md rounded-full border border-white border-opacity-30 text-white hover:bg-white/40 transition-all"
      >
        {showCard ? "✖" : "🎵"}
      </button>

      {/* ✅ كارد الصوت */}
      <div
        className={`absolute top-16 left-5 md:top-20 md:left-10 p-4 md:p-6 rounded-xl bg-white/20 backdrop-blur-lg shadow-lg border border-white border-opacity-20 flex flex-col items-center space-y-3 w-44 md:w-56 transition-all duration-500 ease-in-out ${
          showCard
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <img
          src="https://img.youtube.com/vi/5mWkn0Xb6KM/0.jpg"
          alt="Song Cover"
          className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-md transition-transform hover:scale-105"
        />
        <h3 className="text-sm md:text-base font-bold text-white text-center drop-shadow-lg">
          Madison Beer - Reckless
        </h3>

        {/* ✅ شريط التقدم */}
        <div className="w-full bg-gray-300 rounded-full h-2 md:h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        <div className="text-xs md:text-sm text-white font-mono">
          {Math.floor(currentSeconds)}s / 60s
        </div>

        <button
          onClick={toggleMute}
          className="mt-1 flex items-center justify-center space-x-2 px-3 py-2 md:px-4 md:py-2.5 bg-gray-900 bg-opacity-80 text-white rounded-full shadow-md hover:bg-opacity-90 transition-all"
        >
          {isMuted ? (
            <FaVolumeMute size={16} style={{ color: "#035ea3" }} /> // تغيير لون الأيقونة
          ) : (
            <FaVolumeUp size={16} style={{ color: "#035ea3" }} /> // تغيير لون الأيقونة
          )}
          <span className="text-xs md:text-sm">
            {isMuted ? "Muted" : "Unmute"}
          </span>
        </button>
      </div>

      {/* ✅ المحتوى الرئيسي */}
      <div
        className={`relative z-20 text-center text-white px-4 transition-all duration-500 ${
          showCard ? "mt-40" : "mt-0"
        }`}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-5 md:mb-6"
          style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
        >
          Welcome to Arab Universe
        </h2>
        <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-10">
          Live the Ultimate RP Adventure
        </p>
        <div className="min-h-screen flex items-center justify-center ">
          {/* الزر الرئيسي */}
          <button
            onClick={handleButtonClick}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 md:py-4 md:px-8 rounded-full transform transition-all hover:scale-110 shadow-lg md:shadow-2xl animate-pulse"
          >
            Join the Action
          </button>

          {/* الـ Pop-up */}
          {isPopupOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={closePopup} // إغلاق الـ pop-up عند الضغط خارج النافذة
            >
              <div
                className="bg-gray-800 rounded-lg p-8 max-w-md w-full relative border border-blue-500/20 shadow-2xl"
                onClick={(e) => e.stopPropagation()} // منع إغلاق الـ pop-up عند الضغط داخله
              >
                {/* زر الإغلاق (X) */}
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 text-[#035ea3] hover:text-[#0284c7] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* اللوجو */}
                <div className="flex justify-center mb-6">
                  <Image
                    src="/images/au.png" // مسار اللوجو الخاص بك
                    alt="Arab Universe Logo"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>

                {/* التعليمات */}
                <div className="space-y-4 text-center">
                  <p className="text-gray-300 text-lg">1- Open FiveM</p>
                  <p className="text-gray-300 text-lg">2- Press F8</p>
                  <p className="text-gray-300 text-lg">3- Copy this</p>
                  <p className="text-blue-400 font-mono bg-gray-700 p-2 rounded">
                    connect 91.212.121.248
                  </p>
                  <p className="text-gray-300 text-lg">4- Press Enter</p>
                  <p className="text-gray-300 text-lg mt-4">
                    Welcome to ARAB UNIVERSE
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// StatBox Component for Stats Tracker
const StatBox = ({ value, label }) => {
  const props = useSpring({
    number: value,
    from: { number: 0 },
    config: { duration: 2000 },
  });
  return (
    <div className="p-4 sm:p-6 bg-blue-900 rounded-xl shadow-xl transform transition-all hover:scale-110 glow-effect">
      <animated.div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400">
        {props.number.to((n) => n.toFixed(0))}
      </animated.div>

      <div className="mt-2 text-white text-sm sm:text-base">{label}</div>
    </div>
  );
};

// Stats Tracker Section
const StatsTracker = () => {
  const [onlinePlayers, setOnlinePlayers] = useState(0);
  const [discordCount, setDiscordCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setOnlinePlayers(Math.floor(Math.random() * 1000));
    }, 3000);

    const fetchDiscordData = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/discord/members"
        );
        setDiscordCount(data.member_count);
        setError(null);
      } catch (err) {
        console.error("Error fetching Discord data:", err);
        setError("Failed to load Discord count");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscordData();
    const discordInterval = setInterval(fetchDiscordData, 300000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(discordInterval);
    };
  }, []);

  return (
    // خلفية داكنة متدرجة من الرمادي الداكن إلى الأسود
    <section className="py-12 bg-gradient-to-b from-gray-900 to-black text-white text-center">
      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 animate-fadeIn text-white">
        Live server statistics
      </h3>
      <div className="flex flex-col sm:flex-row justify-around max-w-5xl mx-auto gap-4 sm:gap-0 px-4">
        <StatBox value={onlinePlayers} label="Players Online" />
        <StatBox value={45} label="Active Gangs" />
        <div className="p-4 sm:p-6 bg-blue-900 rounded-xl shadow-xl transform transition-all hover:scale-110 glow-effect">
          {loading ? (
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold animate-pulse">
              ...
            </div>
          ) : error ? (
            <div className="text-red-400 text-sm">⚠️ Error</div>
          ) : (
            <>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400">
                {discordCount}
              </div>
              <div className="mt-2 text-white text-sm sm:text-base">
                Discord Crew
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Media Gallery Section

const MediaGallery = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    "/images/mustang.png",
    "/images/gt3.png",
    "/images/supra.png",
    "/images/bmw2.png",
    "/images/gclass.png",
    "/images/bmw.png",
  ];

  return (
    <section className="py-16 bg-black text-white">
      <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 animate-pulse text-gray-400">
        Epic Moments
      </h3>
      <Slider {...settings} className="max-w-6xl mx-auto px-4">
        {images.map((image, index) => (
          <div key={index} className="px-2">
            <img
              src={image}
              alt={`Scene ${index + 1}`}
              className="w-full rounded-lg shadow-2xl transform hover:scale-105"
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Leaderboard Section
const Leaderboard = () => (
  <section className="py-16 bg-gradient-to-b from-black to-gray-900 text-white">
    <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12 animate-pulse text-gray-400">
      Top Legends
    </h3>
    <div className="max-w-lg mx-auto space-y-6 px-4">
      {[
        { name: "KingSlayer", points: 2500 },
        { name: "ShadowRacer", points: 2200 },
        { name: "ChaosLord", points: 2000 },
      ].map((player, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg shadow-2xl flex justify-between items-center ${
            index === 0
              ? " bg-orange-600"
              : index === 1
              ? "bg-yellow-600"
              : "bg-gray-400"
          } animate-fadeInUp`}
        >
          <span className="font-bold text-xl sm:text-2xl">{player.name}</span>
          <span className="text-lg sm:text-xl">{player.points} PTS</span>
        </div>
      ))}
    </div>
  </section>
);

// Main HomePage Component
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsTracker />
      <MediaGallery />
      <Leaderboard />
    </div>
  );
}
