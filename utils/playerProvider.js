import React, { createContext, useState } from "react";

export const PlayerContext = createContext();
const PlayerProvider = (props) => {
  const [audioSurah, setAudioSurah] = useState({});
  const storeAudioSurah = (audioSurah) => {
    setAudioSurah(audioSurah);
  };

  return (
    <PlayerContext.Provider value={{ audioSurah, storeAudioSurah }}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerProvider;
