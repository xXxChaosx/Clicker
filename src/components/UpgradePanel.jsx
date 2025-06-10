import React from 'react';
import styles from '../styles/UpgradePanel.module.scss';
import { playSound } from '../utils/playSound';
import upgradeSound from '../sounds/upgrade.mp3';

const UpgradePanel = ({ credits, buyUpgrade, comboChance, doubleCaseChance, antibonus }) => {
  const upgrades = [
    { type: 'clickValue', cost: 100, value: 1, label: '+1 до кліків' },
    { type: 'comboChance', cost: 300, value: 0.05, label: '+5% шанс на комбо', disabled: comboChance >= 1 },
    { type: 'passiveIncome', cost: 500, value: 5, label: '+5 до пасивного доходу' },
    { type: 'multiplier', cost: 1000, value: 0.5, label: '+0.5 множник' },
    { type: 'doubleCaseChance', cost: 800, value: 0.1, label: '+10% шанс на подвійний кейс', disabled: doubleCaseChance >= 1 },
  ];

  const handleBuy = (type, cost, value) => {
    playSound(upgradeSound);
    buyUpgrade(type, cost, value);
  };

  return (
    <div className={styles.upgradeContainer}>
      <h2>Апгрейди</h2>
      {upgrades.map((u) => (
        <button
          key={u.type}
          className={styles.upgradeButton}
          onClick={() => handleBuy(u.type, u.cost, u.value)}
          disabled={credits < u.cost || u.disabled || antibonus === 'blockUpgrades'}
        >
          {u.label} - {u.cost} кредитів
        </button>
      ))}
      {antibonus === 'blockUpgrades' && (
        <div style={{ color: 'red', marginTop: 8 }}>Апгрейди тимчасово заблоковані антибонусом!</div>
      )}
    </div>
  );
};

export default UpgradePanel;
