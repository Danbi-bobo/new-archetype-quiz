import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a reliable ambient music from Pixabay CDN
    // This is a public domain ambient/meditation track suitable for spiritual content
    const audioUrl = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=healing-soul-111493.mp3";

    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Add error listener to catch loading issues
    audio.addEventListener('error', (e) => {
      console.warn("Audio failed to load:", e);
      setIsMuted(true);
    });

    // Attempt to play automatically
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play was prevented by browser policy (user hasn't interacted yet)
        console.log("Auto-play prevented by browser policy.");
        setIsMuted(true);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;

    // If the audio is currently paused (e.g. autoplay blocked), 
    // interaction allows us to play it now.
    if (audioRef.current.paused) {
      audioRef.current.play().catch(e => console.error("Play failed:", e));
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      // Toggle mute state if already playing
      if (isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 p-3 bg-white/60 backdrop-blur-md rounded-full hover:bg-white transition-all duration-500 text-stone-400 hover:text-stone-900 border border-stone-200 shadow-sm group no-print hover:scale-105 active:scale-95"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      title={isMuted ? "Unmute Ambience" : "Mute Ambience"}
    >
      {isMuted ? (
        <VolumeX size={18} strokeWidth={1.5} className="opacity-80 group-hover:opacity-100" />
      ) : (
        <Volume2 size={18} strokeWidth={1.5} className="opacity-80 group-hover:opacity-100" />
      )}
    </button>
  );
};