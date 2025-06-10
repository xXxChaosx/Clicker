import React from 'react';
import styles from '../styles/AntiBonusPanel.module.scss';

const AntiBonusPanel = ({
  antibonus,
  isClickFrozen,
}) => {
  const getAntibonusMessage = () => {
    switch (antibonus) {
      case 'freeze':
        return `Антибонус: кліки заморожені!`;
      case 'negativeClick':
        return `Антибонус: кожне натискання віднімає кредити!`;
      case 'loseCredits':
        return `Антибонус: втрачено 1000 кредитів!`;
      default:
        return 'Антибонусів наразі немає.';
    }
  };

  return (
    <div className={styles.antibonusContainer}>
      <h2>Антибонуси</h2>
      <p>{getAntibonusMessage()}</p>
      {isClickFrozen && <p style={{ color: 'red' }}>⚠️ Кліки заблоковані!</p>}
    </div>
  );
};

export default AntiBonusPanel;
