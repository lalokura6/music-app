import SongItem from './SongItem';
import { songData } from "../data/song";

const SongList = ({ songs, onPlay, onToggleFavorite, favorites, currentSong, isPlaying }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {songData.map((song) => (
        <SongItem
          key={song.id}
          song={song}
          onPlay={onPlay}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(song.id)}
          isPlaying={isPlaying && currentSong.id === song.id}
        />
      ))}
    </div>
  );
};

export default SongList;
