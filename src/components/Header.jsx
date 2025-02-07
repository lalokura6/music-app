const Header = ({ currentSong, isPlaying }) => {
  // if (!currentSong) {
  //   return <header className="bg-gray-800 p-4 flex items-center border-b border-gray-700">No song is selected</header>;
  // }

  return (
    <header className="bg-gray-800 p-4 flex custom-padding items-center justify-center border-b gap-5 border-gray-700">
      <img 
        src={currentSong.imageUrl} 
        alt={currentSong.title}
        className={`w-auto h-30 rounded-md  ${isPlaying ? 'animate-pulse' : ''}`}
        style={{ animationDuration: '3s' }}
      />
      <div className="ml-4">
        <h2 className="text-xl font-bold">{currentSong.title}</h2> 
        <p className="text-gray-400">{currentSong.artist}</p>
      </div>
    </header>
  );
};

export default Header;
  