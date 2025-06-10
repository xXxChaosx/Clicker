// hooks/useSaveGame.js
import { saveGame } from '../db/indexedDB';
import { useEffect } from 'react';

export const useSaveGame = (state, loading) => {
  useEffect(() => {
    if (!loading) {
      saveGame(state);
    }
  }, [state, loading]);
};
