import React from 'react';
import styles from '../styles/PrestigePanel.module.scss';
import prestigeSound from '../sounds/prestige.mp3';
import { playSound } from '../utils/playSound';

const PrestigePanel = ({ credits, duiktCoins, applyPrestige }) => {
  const handlePrestige = () => {
    playSound(prestigeSound);
    applyPrestige();
  };

  return (
    <div className={styles.prestigeContainer}>
      <h2>Престиж</h2>
      <p>Кредити: {credits}</p>
      <p>DuiktCoins: {duiktCoins}</p>
      <button onClick={handlePrestige} disabled={credits < 100000000}>
        Скинути прогрес
      </button>
      {credits < 100000000
        ? <div style={{fontSize:12, color:'#888'}}>Потрібно 100 000 000 кредитів для престижу</div>
        : <div style={{fontSize:12, color:'#2e7d32'}}>Можна скинути прогрес!</div>
      }
      <p style={{fontSize:13, color:'#1976d2'}}>
        Кожен Duikt Coin дає +5 до кліку та +1 до множника назавжди!
      </p>
    </div>
  );
};

export default PrestigePanel;
