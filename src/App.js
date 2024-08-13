import React, { useState, useRef } from 'react';
import './App.css';
import { cn } from "./lib/utils";
import { AnimatedList } from './animated-list';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';

let notifications = [
  {
    name: "kamala",
    description: "get your brat on! I love it!",
    time: "5m ago",
    icon: "kam.png",
    color: "#FFFFFF",
  },
  {
    name: "billy",
    description: "you've always been a brat",
    time: "4m ago",
    icon: "billy.png",
    color: "#FFFFFF",
  },
  {
    name: "iggy",
    description: "even though you're a brat i'll be your $MOTHER",
    time: "3m ago",
    icon: "iggy.png",
    color: "#FFFFFF",
  },
  {
    name: "charli",
    description: "I started this f*cking trend send me some %",
    time: "1m ago",
    icon: "charli.png",
    color: "#FFFFFF",
  },
];

notifications = Array.from({ length: 1 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] transform cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-12 items-center justify-center rounded-2xl overflow-hidden"
          style={{
            backgroundColor: color,
          }}
        >
          <img src={icon} alt="Icon" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

function App() {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('nasty.mp3'));

  const handleCopy = () => {
    navigator.clipboard.writeText('soon...');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Hide the message after 2 seconds
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden"
      style={{ 
        backgroundImage: "url('/bg.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      <div className='absolute top-5 left-5 right-5 z-20'>
        <AnimatedList>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>

      <motion.img
        src="brat.png"
        className='w-[70%] md:w-[30%] border-2 border-lime-500 z-10'
        alt="Brat"
        whileHover={{
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3 }
        }}
        onClick={toggleAudio}
        style={{ cursor: 'pointer' }}
      />
      
      <div className='absolute bottom-10 md:left-10 flex justify-center'>
          <div className='flex flex-col sm:flex-row justify-center bg-slate-100 rounded-xl md:rounded-full z-10 items-center gap-1 md:gap-3 px-5 py-3 max-w-full border-2'>
            <button
              onClick={handleCopy}
              className="text-sm bg-lime-500 text-white py-2 px-4 rounded-full md:hover:bg-green-600 border-2 transition-colors duration-300 z-10 whitespace-nowrap"
            >
              {copied ? 'Copied!' : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                  </svg>
                  }
            </button>
            <div className='text-sm md:text-lg overflow-x-auto font-custom'>
              soon...
            </div>
          </div>
      </div>

      <div className='absolute top-0 w-[130%] bg-black text-lime-400 py-2 text-3xl md:text-5xl rotate-45 translate-x-[7.5%] overflow-clip'>
        <Marquee speed={200} className='overflow-clip'>
          brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat brat&nbsp;
        </Marquee>
      </div>
      <div className='absolute top-0 w-[120%] bg-black text-lime-400 py-2 text-4xl md:text-6xl -rotate-45 -translate-x-[10%] translate-y-[190%] overflow-clip'>
        <Marquee speed={200} className='overflow-clip'>
          brat summer brat summer brat summer brat summer brat summer brat summer brat summer brat summer brat summer brat summer&nbsp;
        </Marquee>
      </div>

      <div className='absolute top-5 left-5 flex justify-center items-center z-10'>
        <a href="https://x.com/" className=''>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#84cc16" viewBox="0 0 50 50">
            <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
          </svg>
        </a>
        <a href="https://t.me/" className=''>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#84cc16" viewBox="0 0 50 50">
            <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default App;