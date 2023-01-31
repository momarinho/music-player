import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import ncs from '../assets/ncs.mp3';
import tavern from '../assets/tavern.jpg';

import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { IconContext } from 'react-icons';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(ncs);
  const [time, setTime] = useState({
    min: '',
    sec: '',
  });
  const [currentTime, setCurrentTime] = useState({
    min: '',
    sec: '',
  });
  const [seconds, setSeconds] = useState();

  const playButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [duration, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrentTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <div className="container">
      <h2>Playing</h2>
      <img className="music-cover" src={tavern} alt="" />
      {/* src="https://picsum.photos/200/200" */}

      <div>
        <h3 className="title"> Need You [NCS Release]</h3>
        <p className="subtitle">Yonexx & lunar</p>
      </div>

      <div>
        <button className="play-btn">
          <IconContext.Provider value={{ size: '3em', color: '#7B89AE' }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>

        {!isPlaying ? (
          <button className="play-btn" onClick={playButton}>
            <IconContext.Provider value={{ size: '3em', color: '#2F426C' }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="play-btn" onClick={playButton}>
            <IconContext.Provider value={{ size: '3em', color: '#9E2D5B' }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}

        <button className="play-btn">
          <IconContext.Provider value={{ size: '3em', color: '#7B89AE' }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>

      <div>
        <div className="time">
          <p>
            {currentTime.min}:{currentTime.sec}
          </p>
          <p>
            {time.min}:{time.sec}
          </p>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>

      <footer>
        Song: Yonexx & lunar - Need You [NCS Release] Music provided by
        NoCopyrightSounds Free Download/Stream: http://ncs.io/YL_NeedYou Watch:
        http://youtu.be/
      </footer>
    </div>
  );
}
