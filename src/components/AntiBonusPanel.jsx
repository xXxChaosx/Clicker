import React from 'react';
import styles from '../styles/AntiBonusPanel.module.scss';

const AntiBonusPanel = ({
  antibonus,
  isClickFrozen,
  // antiBonusTimer,
  // nextAntiBonus,
  // antibonusTimeLeft
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

      {/* <div className="anti-bonus-panel">
        <h3>Наступний антибонус</h3>
        <div className="anti-bonus-info">
          <span>Через: <span style={{ color: 'red' }}>{antiBonusTimer}</span> сек</span>
          <br />
          <span>Тип: <span style={{ color: 'red' }}>{nextAntiBonus}</span></span>
        </div>
      </div> */}
    </div>
  );
};

export default AntiBonusPanel;
