import React, { useEffect, useRef, useState } from 'react';
import { useClicker } from './hooks/useClicker';
import { useSaveGame } from './hooks/useSaveGame';
import { saveGame } from './db/indexedDB';
import ClickButton from './components/ClickButton';
import UpgradePanel from './components/UpgradePanel';
import BonusPanel from './components/BonusPanel';
import PrestigePanel from './components/PrestigePanel';
import GameStats from './components/GameStats';
import SkinPanel from './components/SkinPanel';
import AdminPanel from './components/AdminPanel';
import AntibonusPopup from './components/AntibonusPopup';
import './styles/App.module.scss';

const AUTO_SAVE_INTERVAL = 60;
// const ANTI_BONUS_INTERVAL = 600;

const antiBonusOptions = [
  'freeze',
  'negativeClick',
  'loseCredits'
];

const App = () => {
  const {
    loading,
    credits,
    duiktCoins,
    clickValue,
    setClickValue,
    autoClickerValue,
    passiveIncomeValue,
    multiplier,
    comboChance,
    doubleCaseChance,
    skins,
    currentSkin,
    antibonus,
    isClickFrozen,
    earnCredits,
    openCase,
    buyUpgrade,
    switchSkin,
    applyPrestige,
    triggerAntibonus,
    antibonusTimeLeft,
  } = useClicker();

  const [saveTimer, setSaveTimer] = useState(AUTO_SAVE_INTERVAL);
  // const [antiBonusTimer, setAntiBonusTimer] = useState(ANTI_BОНУС_INTERVAL);
  // const [nextAntiBonus, setNextAntiBonus] = useState(
  //   antiBonusOptions[Math.floor(Math.random() * antiBonusOptions.length)]
  // );

  const timerRef = useRef();
  const antiBonusRef = useRef();

  const saveState = {
    credits,
    duiktCoins,
    clickValue,
    passiveIncomeValue,
    multiplier,
    comboChance,
    doubleCaseChance,
    skins,
    currentSkin
  };

  // Автозбереження запускається лише один раз після завантаження
  useEffect(() => {
    if (!loading) {
      timerRef.current = setInterval(() => {
        setSaveTimer((t) => {
          if (t <= 1) {
            saveGame(saveState);
            return AUTO_SAVE_INTERVAL;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [loading]);

  // Антибонус таймер
  // useEffect(() => {
  //   if (!loading) {
  //     antiBonusRef.current = setInterval(() => {
  //       setAntiBonusTimer((t) => {
  //         if (t <= 1) {
  //           triggerAntibonus(nextAntiBonus);
  //           // Випадково обираємо наступний антибонус
  //           const newAntiBonus = antiBonusOptions[Math.floor(Math.random() * antiBonusOptions.length)];
  //           setNextAntiBonus(newAntiBonus);
  //           return ANTI_BОНУС_INTERVAL;
  //         }
  //         return t - 1;
  //       });
  //     }, 1000);
  //   }

  //   return () => clearInterval(antiBonusRef.current);
  // }, [loading, nextAntiBonus, triggerAntibonus]);

  const handleSaveNow = async () => {
    await saveGame(saveState);
    setSaveTimer(AUTO_SAVE_INTERVAL);
  };

  useSaveGame(saveState, loading);

  const handleAddClickValue = () => {
    buyUpgrade('clickValue', 0, 10000000);
  };

  // Додаємо клас теми до body
  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-neon', 'theme-lightbrown');
    document.body.classList.add(`theme-${currentSkin}`);
  }, [currentSkin]);

  if (loading) {
    return (
      <div className={`app-container theme-light`}>
        <h1 className="game-title">Duikt Clicker Game</h1>
        <div style={{ fontSize: 24, marginTop: 40 }}>Завантаження...</div>
      </div>
    );
  }

  return (
    <div className={`app-container theme-${currentSkin}`}>
      <AntibonusPopup antibonus={antibonus} antibonusTimeLeft={antibonusTimeLeft} />
      <AdminPanel addClickValue={handleAddClickValue} />
      <h1 className="game-title">Duikt Clicker Game</h1>

      <GameStats
        credits={credits}
        duiktCoins={duiktCoins}
        clickValue={clickValue}
        autoClickerValue={autoClickerValue}
        passiveIncomeValue={passiveIncomeValue}
        multiplier={multiplier}
        comboChance={comboChance}
        doubleCaseChance={doubleCaseChance}
      />
      <div className="main-sections">
        <div className="centered-stack">
          <ClickButton onClick={earnCredits} value={clickValue} credits={credits} />
          <UpgradePanel
            credits={credits}
            buyUpgrade={buyUpgrade}
            comboChance={comboChance}
            doubleCaseChance={doubleCaseChance}
            antibonus={antibonus}
          />
        </div>
        <BonusPanel
          credits={credits}
          duiktCoins={duiktCoins}
          openCase={openCase}
          buyUpgrade={buyUpgrade}
          comboChance={comboChance}
          doubleCaseChance={doubleCaseChance}
        />
        <PrestigePanel
          credits={credits}
          duiktCoins={duiktCoins}
          applyPrestige={applyPrestige}
        />
        <SkinPanel credits={credits} currentSkin={currentSkin} skins={skins} switchSkin={switchSkin} />
      </div>
    </div>
  );
};

export default App;
