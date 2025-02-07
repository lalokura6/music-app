import {  
    Play, 
    Pause, 
    SkipBack, 
    SkipForward, 
    Volume2, 
    VolumeX,
    Repeat,
    Shuffle
  } from 'lucide-react';
  
  const PlaybackControls = ({ 
    isPlaying, 
    onPlayPause, 
    onPrevious, 
    onNext,
    onToggleRepeat,
    onToggleShuffle,
    isRepeat,
    isShuffle,
    volume,
    onVolumeChange,
    isMuted,
    onToggleMute
  }) => {
    return (
      <div className="flex flex-row items-center justify-center space-y-2">
        <div className="flex items-center space-x-4">
          {/* <button 
            onClick={onToggleShuffle}
            className={`p-2 rounded-full transition-colors ${isShuffle ? 'text-green-500' : 'text-gray-400'} hover:text-white`}
          >
            <Shuffle size={20} />
          </button> */}
          {/* <button 
            onClick={onPrevious}
            className="p-2 text-gray-400 hover:text-white"
          >
            <SkipBack size={24} />
          </button> */}
          <button 
            onClick={onPlayPause}
            className="p-3 mr-3 bg-white rounded-full hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause size={24} className="text-black" />
            ) : (
              <Play size={24} className="text-black" />
            )}
          </button>
          {/* <button 
            onClick={onNext}
            className="p-2 text-gray-400 hover:text-white"
          >
            <SkipForward size={24} />
          </button> */}
          {/* <button 
            onClick={onToggleRepeat}
            className={`p-2 rounded-full transition-colors ${isRepeat ? 'text-green-500' : 'text-gray-400'} hover:text-white`}
          >
            <Repeat size={20} />
          </button> */}
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onToggleMute}
            className="p-2 text-gray-400 hover:text-white"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={e => onVolumeChange(parseFloat(e.target.value))}
            className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>
    );
  };
  
  export default PlaybackControls;