import React from 'react';
import styles from '../styles/AntiBonusPanel.module.scss';

const antibonusMessages = {
  freeze: 'Антибонус: кліки заморожені!',
  negativeClick: 'Антибонус: кожне натискання віднімає кредити!',
  loseCredits: 'Антибонус: втрачено 1000 кредитів!',
  blockUpgrades: 'Антибонус: апгрейди заблоковані!',
  halveIncome: 'Антибонус: пасивний дохід зменшено вдвічі!',
};

const AntibonusPopup = ({ antibonus, antibonusTimeLeft }) => {
  if (!antibonus) return null;
  return (
    <div className={styles.antibonusPopup}>
      <div>{antibonusMessages[antibonus] || 'Активний антибонус!'}</div>
      <div style={{ fontSize: 14, marginTop: 4 }}>
        Залишилось: {antibonusTimeLeft} сек
      </div>
    </div>
  );
};

export default AntibonusPopup;