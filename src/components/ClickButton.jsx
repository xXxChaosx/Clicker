import React, { useState } from 'react';
import styles from '../styles/ClickButton.module.scss';
import { motion } from 'framer-motion';
import { playSound } from '../utils/playSound';
import clickSound from '../sounds/click.mp3';

const ClickButton = ({ onClick, value, credits }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickEffect, setClickEffect] = useState(null);

  const handleClick = () => {
    setIsClicked(true);
    playSound(clickSound);
    onClick();
    setClickEffect({ x: 0, y: -20, opacity: 1, value });
    setTimeout(() => {
      setIsClicked(false);
      setClickEffect(null);
    }, 300);
    setTimeout(() => {
      setClickEffect(prev => prev && { ...prev, opacity: 0 });
    }, 600);
  };

  return (
    <motion.div
      className={styles.clickContainer}
      initial={{ scale: 1 }}
      animate={isClicked ? { scale: 0.9 } : { scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <button
        className={styles.clickButton}
        onClick={handleClick}
        disabled={credits >= 100000000}
      >
        Натисни мене!
        {clickEffect && (
          <motion.span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              fontSize: '1.1rem',
              color: 'green',
              opacity: clickEffect.opacity,
            }}
            animate={{ y: clickEffect.y, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            +{clickEffect.value}
          </motion.span>
        )}
      </button>
      {credits >= 100000000 && (
        <div className={styles.maxMsg}>
          Досягнуто максимуму! Скиньте прогрес для продовження.
        </div>
      )}
      <p>Кредити: {credits}</p>
      <p>За клік: {value}</p>
    </motion.div>
  );
};

export default ClickButton;