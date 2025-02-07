import { Heart, Play, Pause } from 'lucide-react';

const SongItem = ({ song, onPlay, onToggleFavorite, isFavorite, isPlaying }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg mb-2">
      <div className="flex items-center flex-1">
        <img 
          src={song.imageUrl}
          alt={song.title}
          className="w-14 h-14 rounded-md"
        />
        <div className="ml-4">
          <h3 className="font-medium">{song.title}</h3>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onPlay(song)}
          className="p-2 hover:bg-green-600 rounded-full transition-colors"
        >
          {isPlaying ? 
            <Pause className="w-6 h-6" /> : 
            <Play className="w-6 h-6" />
          }
        </button>
        <button 
          onClick={() => onToggleFavorite(song.id)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <Heart 
            className="w-6 h-6"
            fill={isFavorite ? "#9747FF" : "none"}
            color={isFavorite ? "#9747FF" : "currentColor"}
          />
        </button>
      </div>
    </div>
  );
};

export default SongItem;