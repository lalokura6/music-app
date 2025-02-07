
const ProgressBar = ({ progress, duration, onSeek }) => {
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
  
    return (
      <div className="flex items-center space-2">
        <span className="text-xs text-gray-400">{formatTime(progress)}</span>
        <div className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer" onClick={onSeek}>
          <div 
            className="h-full bg-green-500 rounded-full relative"
            style={{ width: `${(progress / duration) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow -translate-x-1/2" />
          </div>
        </div>
        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
      </div>
    );
  };
  
  export default ProgressBar;