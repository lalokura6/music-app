import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import SongList from './components/SongList';
import ProgressBar from './components/ProgressBar';
import PlaybackControls from './components/PlaybackControls';


const App = () => {
  const songData = [];
  const [currentSong, setCurrentSong] = useState({ id: "null" }); 
  const [favorites, setFavorites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Configurar listeners de audio
    audioRef.current.onloadedmetadata = () => {
      setDuration(audioRef.current.duration);
    };

    audioRef.current.ontimeupdate = () => {
      setProgress(audioRef.current.currentTime);
    };

    audioRef.current.onended = () => {
      if (isRepeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        playNext();
      }
    };

    return () => {
      audioRef.current.pause();
      audioRef.current.src = '';
    };
  }, [isRepeat]);

  const toggleFavorite = (songId) => {
    if (favorites.includes(songId)) {
      setFavorites(favorites.filter(id => id !== songId));
    } else {
      setFavorites([...favorites, songId]);
    }
  };

  const playSong = (song) => {
    if (currentSong.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.pause();
      audioRef.current.src = song.audioUrl;
      audioRef.current.play();
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const getCurrentIndex = () => songData.findIndex(song => song.id === currentSong.id);

  const playNext = () => {
    console.log(getCurrentIndex())
    const currentIndex = getCurrentIndex();
    let nextIndex;
    
    if (isShuffle) {
      console.log(isShuffle)
      nextIndex = Math.floor(Math.random() * songData.length);
    } else {
      nextIndex = (currentIndex + 1) % songData.length;
    }
    
    playSong(songData[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = getCurrentIndex();
    let prevIndex;
    
    if (isShuffle) {
      console.log(isShuffle)
      prevIndex = Math.floor(Math.random() * songData.length);
    } else {
      prevIndex = (currentIndex - 1 + songData.length) % songData.length;
    }
    
    playSong(songData[prevIndex]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header currentSong={currentSong} isPlaying={isPlaying} />
      <main className="flex-1 p-6 overflow-y-auto">
        <SongList
          songs={songData}
          onPlay={playSong}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
          currentSong={currentSong}
          isPlaying={isPlaying}
        />
      </main>
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="max-w-4xl mx-auto space-y-4">
          <ProgressBar 
            progress={progress}
            duration={duration}
            onSeek={handleSeek}
          />
          <PlaybackControls
            isPlaying={isPlaying}
            onPlayPause={() => playSong(currentSong)}
            onPrevious={playPrevious}
            onNext={playNext}
            onToggleRepeat={() => setIsRepeat(!isRepeat)}
            onToggleShuffle={() => setIsShuffle(!isShuffle)}
            isRepeat={isRepeat}
            isShuffle={isShuffle}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            isMuted={isMuted}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    </div>
  );
};

export default App;