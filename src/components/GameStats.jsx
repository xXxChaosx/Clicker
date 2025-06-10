import React from 'react';
import styles from '../styles/GameStats.module.scss';
import AdminPanel from './AdminPanel';

const GameStats = ({
  credits,
  duiktCoins,
  clickValue,
  passiveIncomeValue,
  multiplier,
  comboChance,
  doubleCaseChance
}) => {
  return (
    <div className={styles.statsWrapper}>
      <h2 className={styles.statsTitle}>Статистика</h2>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Кредити</span>
          <span className={styles.statValue}>{credits}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Duikt Coins</span>
          <span className={styles.statValue}>{duiktCoins}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>За клік</span>
          <span className={styles.statValue}>{clickValue}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Пасивний дохід</span>
          <span className={styles.statValue}>{(passiveIncomeValue * (1 + duiktCoins * 0.1)).toFixed(2)} / сек</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Множник</span>
          <span className={styles.statValue}>x{multiplier.toFixed(2)}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Шанс комбо</span>
          <span className={styles.statValue}>{(comboChance * 100).toFixed(1)}%</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Шанс 2x кейс</span>
          <span className={styles.statValue}>{(doubleCaseChance * 100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;