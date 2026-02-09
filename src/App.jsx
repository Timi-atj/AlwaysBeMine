import React, { useState, useRef, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import Swal from "sweetalert2";
import { BsVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";
import { FiHeart, FiMusic } from "react-icons/fi";

import MouseStealing from './MouseStealer.jsx';
import lovesvg from "./assets/All You Need Is Love SVG Cut File.svg";
import Lovegif from "./assets/GifData/main_temp.gif";
import heartGif from "./assets/GifData/happy.gif";
import sadGif from "./assets/GifData/sad.gif";
import WordMareque from './MarqueeProposal.jsx';
import purposerose from './assets/GifData/RoseCute.gif';
import swalbg from './assets/Lovingbg2_main.jpg';
import loveu from './assets/GifData/cutieSwal4.gif';

//! yes - Gifs Importing
import yesgif0 from "./assets/GifData/Yes/lovecutie0.gif";
import yesgif1 from "./assets/GifData/Yes/love2.gif";
import yesgif2 from "./assets/GifData/Yes/love3.gif";
import yesgif3 from "./assets/GifData/Yes/love1.gif";
import yesgif4 from "./assets/GifData/Yes/lovecutie1.gif";
import yesgif5 from "./assets/GifData/Yes/lovecutie5.gif";
import yesgif6 from "./assets/GifData/Yes/lovecutie7.gif";
import yesgif7 from "./assets/GifData/Yes/lovecutie8.gif";
import yesgif8 from "./assets/GifData/Yes/lovecutie3.gif";
import yesgif9 from "./assets/GifData/Yes/lovecutie9.gif";
import yesgif10 from "./assets/GifData/Yes/lovecutie6.gif";
import yesgif11 from "./assets/GifData/Yes/lovecutie4.gif";

//! no - Gifs Importing
import nogif0 from "./assets/GifData/No/breakRej0.gif";
import nogif0_1 from "./assets/GifData/No/breakRej0_1.gif";
import nogif1 from "./assets/GifData/No/breakRej1.gif";
import nogif2 from "./assets/GifData/No/breakRej2.gif";
import nogif3 from "./assets/GifData/No/breakRej3.gif";
import nogif4 from "./assets/GifData/No/breakRej4.gif";
import nogif5 from "./assets/GifData/No/breakRej5.gif";
import nogif6 from "./assets/GifData/No/breakRej6.gif";
import nogif7 from "./assets/GifData/No/RejectNo.gif";
import nogif8 from "./assets/GifData/No/breakRej7.gif";

//! yes - Music Importing
import yesmusic1 from "./assets/AudioTracks/Love_LoveMeLikeYouDo.mp3";
import yesmusic2 from "./assets/AudioTracks/Love_EDPerfect.mp3";
import yesmusic3 from "./assets/AudioTracks/Love_Nadaaniyan.mp3";
import yesmusic4 from "./assets/AudioTracks/Love_JoTumMereHo.mp3";

//! no - Music Importing
import nomusic1 from "./assets/AudioTracks/Rejection_WeDontTalkAnyMore.mp3";
import nomusic2 from "./assets/AudioTracks/Rejection_LoseYouToLoveMe.mp3";
import nomusic3 from "./assets/AudioTracks/Reject_withoutMe.mp3";
import nomusic4 from "./assets/AudioTracks/Neutral_Base_IHateU.mp3";
import nomusic5 from "./assets/AudioTracks/Reject1_TooGood.mp3";

const YesGifs = [yesgif0, yesgif1, yesgif2, yesgif3, yesgif4, yesgif5, yesgif6, yesgif7, yesgif8, yesgif9, yesgif10, yesgif11];
const NoGifs = [nogif0, nogif0_1, nogif1, nogif2, nogif3, nogif4, nogif5, nogif6, nogif7, nogif8];
const YesMusic = [yesmusic1, yesmusic3, yesmusic4, yesmusic2];
const NoMusic = [nomusic1, nomusic2, nomusic3, nomusic4, nomusic5];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [popupShown, setPopupShown] = useState(false);
  const [yespopupShown, setYesPopupShown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const gifRef = useRef(null);
  const noButtonRef = useRef(null);
  
  // Scale multiplier for yes button - grows more dramatically
  const yesButtonScale = Math.min(noCount * 0.10 + 1, 4);
  
  // Calculate no button opacity based on no count - fades as yes grows
  const noButtonOpacity = noCount > 15 ? Math.max(1 - (noCount - 15) / 20, 0.3) : 1;

  const [floatingGifs, setFloatingGifs] = useState([]);

  const generateRandomPositionWithSpacing = (existingPositions) => {
    let position;
    let tooClose;
    const minDistance = 15;

    do {
      position = {
        top: `${Math.random() * 90}vh`,
        left: `${Math.random() * 90}vw`,
      };

      tooClose = existingPositions.some((p) => {
        const dx = Math.abs(parseFloat(p.left) - parseFloat(position.left));
        const dy = Math.abs(parseFloat(p.top) - parseFloat(position.top));
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
      });
    } while (tooClose);

    return position;
  };

  const handleMouseEnterYes = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 8; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `heart-${i}`,
        src: heartGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseEnterNo = () => {
    const gifs = [];
    const positions = [];

    for (let i = 0; i < 8; i++) {
      const newPosition = generateRandomPositionWithSpacing(positions);
      positions.push(newPosition);

      gifs.push({
        id: `sad-${i}`,
        src: sadGif,
        style: {
          ...newPosition,
          animationDuration: `${Math.random() * 2 + 1}s`,
        },
      });
    }

    setFloatingGifs(gifs);
  };

  const handleMouseLeave = () => {
    setFloatingGifs([]);
  };

  useEffect(() => {
    if (gifRef.current && yesPressed && noCount > 3) {
      gifRef.current.src = YesGifs[currentGifIndex];
    }
  }, [yesPressed, currentGifIndex]);

  useEffect(() => {
    if (yesPressed && noCount > 3) {
      const intervalId = setInterval(() => {
        setCurrentGifIndex((prevIndex) => (prevIndex + 1) % YesGifs.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (gifRef.current) {
      gifRef.current.src = gifRef.current.src;
    }
  }, [noCount]);

  const handleNoClick = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 4) {
      const nextGifIndex = (nextCount - 4) % NoGifs.length;
      if (gifRef.current) {
        gifRef.current.src = NoGifs[nextGifIndex];
      }
    }

    if (nextCount === 1 || (nextCount - 1) % 7 === 0) {
      const nextSongIndex = Math.floor(nextCount / 7) % NoMusic.length;
      playMusic(NoMusic[nextSongIndex], NoMusic);
    }
  };

  const handleYesClick = () => {
    if (!popupShown) {
      setYesPressed(true);
    }
    if (noCount > 3) {
      setYesPressed(true);
      setShowConfetti(true);
      playMusic(YesMusic[0], YesMusic);
    }
  };

  const playMusic = (url, musicArray) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(url);
    audio.muted = isMuted;
    setCurrentAudio(audio);
    audio.addEventListener('ended', () => {
      const currentIndex = musicArray.indexOf(url);
      const nextIndex = (currentIndex + 1) % musicArray.length;
      playMusic(musicArray[nextIndex], musicArray);
    });
    audio.play();
  };

  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "oya Last chance!",
      "ife?",
      "You know its me!",
      "Nawa oh",
      "you sha want to see where this goes",
      "its funny you think you have a choice",
      "and she is still saying no",
      "oya please ive humbled myself",
      "you know you want to say yes",
      "untop say i be green flag",
      "say yes na ;(",
      "ife 1 timi 0",
      "you know you are not going anywhere 💖",
      "you never tire, just say yess",
      "you know you are stubborn right",
      "chai",
      "Now you are just rage baiting me",
      "God you can see her ohh 💔",
      "My heart says yes, what about yours? ❤️",
      "when you are tired youll accept",
      "omo",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  useEffect(() => {
    if (yesPressed && noCount < 4 && !popupShown) {
      Swal.fire({
        title: "I love you sooo Much!!!❤️",
        html: "You've stolen my heart completely! 🥰💖 <br/><br/> But itni pyaari ladki aur itni jaldi haan? <br/>Thoda aur nakhre karke mujhe tarpaao na! 🥰✨",
        showClass: {
          popup: `animate__animated animate__fadeInUp animate__faster`
        },
        width: 700,
        padding: "2.5em",
        color: "#ec4899",
        background: `rgba(255, 255, 255, 0.95) url(${swalbg})`,
        backdrop: `rgba(0, 0, 0, 0.3)`,
        borderRadius: "24px",
        customClass: {
          popup: "swal-glass"
        }
      });
      setPopupShown(true);
      setYesPressed(false);
    }
  }, [yesPressed, noCount, popupShown]);

  useEffect(() => {
    if (yesPressed && noCount > 3 && !yespopupShown) {
      Swal.fire({
        title: "Now that you accepted...",
        html: "did you die.........i still want you to know i love you so much!! ❤️ <br/><br/> You are my everything, my joy, my forever. <br/> Every moment with you is a memory I'll cherish forever, and my heart beats only for you.<br/><br/> And i will be with you in the days that you feel alone or you feel you are not loved enough",
        width: 800,
        padding: "2.5em",
        color: "#ec4899",
        background: `rgba(255, 255, 255, 0.95) url(${swalbg})`,
        backdrop: `rgba(0, 0, 0, 0.5)`,
        borderRadius: "24px",
        customClass: {
          popup: "swal-glass"
        }
      });
      setYesPopupShown(true);
      setYesPressed(true);
    }
  }, [yesPressed, noCount, yespopupShown]);

  useEffect(() => {
    if (noCount == 25) {
      Swal.fire({
        title: "My love for you is endless...",
        html: "like the stars in the sky—shining for you every night, even if you don't always notice. 🌟 <br/><br/> I'll wait patiently, proving every day that you're my everything. ❤️ <br/><br/> Please press 'Yes' and let's make this a forever story. 🥰✨<br/><br/><em>'True love never gives up; it grows stronger with time.'</em>",
        width: 850,
        padding: "2.5em",
        color: "#ec4899",
        background: `rgba(255, 255, 255, 0.95) url(${swalbg})`,
        backdrop: `rgba(0, 0, 0, 0.6)`,
        borderRadius: "24px",
        customClass: {
          popup: "swal-glass"
        }
      });
    }
  }, [noCount]);

  return (
    <>
      {/* Background Gradient */}
      <div className="fixed top-0 left-0 w-screen h-screen -z-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50" />

      {/* Spline 3D Background */}
      <div className="fixed top-0 left-0 w-screen h-screen -z-10 opacity-60">
        <Spline scene="https://prod.spline.design/oSxVDduGPlsuUIvT/scene.splinecode" />
      </div>

      {/* Animated gradient overlay */}
      <div className="fixed top-0 left-0 w-screen h-screen -z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-pulse" />
      </div>

      {noCount > 16 && noCount < 25 && yesPressed == false && <MouseStealing />}

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-8 selection:bg-rose-400 selection:text-white text-zinc-900 overflow-hidden">
        
        {/* Confetti effect */}
        {showConfetti && <Confetti />}

        {yesPressed && noCount > 3 ? (
          // Success State - Glassmorphism Card
          <div className="w-full max-w-md">
            <div className="backdrop-blur-xl bg-white/40 border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-pink-200/50">
              <div className="flex flex-col items-center gap-6">
                {/* Animated GIF */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-rose-300 rounded-2xl blur-2xl opacity-30 -z-10" />
                  <img
                    ref={gifRef}
                    className="h-[240px] w-[240px] object-cover rounded-2xl shadow-lg"
                    src={YesGifs[currentGifIndex]}
                    alt="Yes Response"
                  />
                </div>

                {/* Text Content */}
                <div className="text-center space-y-3">
                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 bg-clip-text text-transparent" style={{ fontFamily: "Charm, serif" }}>
                    I Love You ife
                  </h2>
                  <p className="text-xl md:text-2xl text-rose-600 font-light" style={{ fontFamily: "Beau Rivage, serif" }}>
                    You're the love of my life
                  </p>
                </div>

                <WordMareque />
              </div>
            </div>
          </div>
        ) : (
          // Main Proposal State
          <div className="w-full max-w-2xl">
            {/* Floating SVG - Enhanced */}
            <div className="absolute top-8 left-8 opacity-80 hover:opacity-100 transition-opacity">
              <div className="animate-bounce" style={{ animationDuration: "3s" }}>
                <img src={lovesvg} className="w-24 md:w-32 drop-shadow-lg" alt="Love SVG" />
              </div>
            </div>

            {/* Main Content Card */}
            <div className="backdrop-blur-2xl bg-white/40 border border-white/60 rounded-3xl p-8 md:p-12 shadow-2xl shadow-pink-200/50">
              <div className="flex flex-col items-center gap-8">
                {/* GIF Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-rose-300 rounded-2xl blur-3xl opacity-40 -z-10" />
                  <img
                    ref={gifRef}
                    className="h-[250px] w-[250px] object-cover rounded-2xl shadow-xl border border-white/30"
                    src={Lovegif}
                    alt="Love Animation"
                  />
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-5xl font-bold text-center bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 bg-clip-text text-transparent leading-tight">
                  Will you be my Valentine?
                </h1>

                {/* Button Container - Fixed Layout */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center mt-6 w-full">
                  {/* Yes Button - Left Side */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <button
                      onMouseEnter={handleMouseEnterYes}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleYesClick}
                      style={{
                        transform: `scale(${yesButtonScale})`,
                        transformOrigin: 'center',
                        transition: 'transform 0.3s ease-out',
                      }}
                      className="px-8 py-3 rounded-full font-bold text-white text-lg md:text-xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 shadow-lg shadow-pink-500/50 hover:shadow-xl hover:shadow-pink-500/70 transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20 backdrop-blur-sm whitespace-nowrap"
                    >
                      Yes
                    </button>
                  </div>

                  {/* No Button - Right Side */}
                  <div className="flex-shrink-0">
                    <button
                      ref={noButtonRef}
                      onMouseEnter={handleMouseEnterNo}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleNoClick}
                      style={{
                        opacity: noButtonOpacity,
                        transition: 'opacity 0.3s ease-out',
                      }}
                      className="px-6 py-3 rounded-full font-medium text-zinc-700 bg-white/30 border border-white/40 hover:bg-white/50 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm shadow-md hover:shadow-lg hover:border-white/60 text-sm md:text-base whitespace-nowrap max-w-xs"
                    >
                      {getNoButtonText()}
                    </button>
                  </div>
                </div>

                {/* Counter Badge */}
                {noCount > 0 && (
                  <div className="text-sm font-medium text-rose-500 bg-rose-50/80 backdrop-blur-sm border border-rose-200/50 rounded-full px-4 py-2 mt-4">
                    Attempt {noCount}
                  </div>
                )}
              </div>
            </div>

            {/* Floating GIFs */}
            {floatingGifs.map((gif) => (
              <img
                key={gif.id}
                src={gif.src}
                alt="Floating Animation"
                className="absolute w-12 h-12 animate-bounce pointer-events-none"
                style={{
                  ...gif.style,
                  filter: "drop-shadow(0 4px 12px rgba(236, 72, 153, 0.3))",
                  animationDuration: gif.style.animationDuration,
                }}
              />
            ))}
          </div>
        )}

        {/* Mute Button - Modern */}
        <button
          onClick={toggleMute}
          className="fixed bottom-8 right-8 bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-full hover:bg-white/60 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <BsVolumeMuteFill size={24} className="text-rose-600" />
          ) : (
            <BsVolumeUpFill size={24} className="text-rose-600" />
          )}
        </button>

        <Footer />
      </div>

      {/* Global Styles for SweetAlert */}
      <style>{`
        .swal-glass {
          backdrop-filter: blur(10px);
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .confetti {
          animation: confetti-fall 3s ease-in forwards;
        }
      `}</style>
    </>
  );
}

// Confetti Component
const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full confetti"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            backgroundColor: ["#ec4899", "#f43f5e", "#fb7185", "#fda4af"][
              Math.floor(Math.random() * 4)
            ],
            animation: `confetti-fall ${piece.duration}s ease-in forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <a
      className="fixed bottom-4 right-4 backdrop-blur-xl bg-white/40 border border-white/60 px-4 py-2 rounded-full text-sm font-medium text-rose-600 hover:bg-white/60 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
      href="https://github.com/timi-atj/AlwaysBeMine"
      target="_blank"
      rel="noopener noreferrer"
    >
      Made with{" "}
      <span role="img" aria-label="heart" className="animate-pulse">
        ❤️
      </span>
      {" "}by TIMI
    </a>
  );
};