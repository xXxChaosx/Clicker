import { useState, useEffect, useRef } from 'react';
import { initializeDB, saveGame, loadGame } from '../db/indexedDB';
import { skinsData } from '../components/SkinPanel';
import { playSound } from '../utils/playSound';
import antibonusSound from '../sounds/antibonus.mp3';

const antibonusTypes = [
  'freeze',
  'negativeClick',
  'loseCredits',
  'blockUpgrades',
  'halveIncome'
];

export const useClicker = () => {
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [duiktCoins, setDuiktCoins] = useState(0);
  const [clickValue, setClickValue] = useState(1); // Кількість кредитів за клік
  const [comboChance, setComboChance] = useState(0); // Шанс на комбо
  const [passiveIncomeValue, setPassiveIncomeValue] = useState(0); // Пасивний дохід
  const [multiplier, setMultiplier] = useState(1);
  const [doubleCaseChance, setDoubleCaseChance] = useState(0); // Шанс на подвійний кейс
  const [skins, setSkins] = useState(['light', 'dark', 'neon']);
  const [currentSkin, setCurrentSkin] = useState('light'); // Початковий скін

  // Антибонуси
  const [antibonus, setAntibonus] = useState(null);
  const [isClickFrozen, setIsClickFrozen] = useState(false);
  const [antibonusTimeLeft, setAntibonusTimeLeft] = useState(0);
  const antibonusTimerRef = useRef(null);

  // Ініціалізація бази даних та завантаження гри
  useEffect(() => {
    initializeDB().then(() => {
      loadGame().then((data) => {
        if (data) {
          setCredits(data.credits ?? 0);
          setDuiktCoins(data.duiktCoins ?? 0);
          setClickValue(data.clickValue ?? 1);
          setComboChance(data.comboChance ?? 0);
          setPassiveIncomeValue(data.passiveIncomeValue ?? 0);
          setMultiplier(data.multiplier ?? 1);
          setDoubleCaseChance(data.doubleCaseChance ?? 0);
          setSkins(data.skins ?? ['light', 'dark', 'neon']);
          setCurrentSkin(data.currentSkin ?? 'light');
        }
        setLoading(false);
      });
    });
  }, []);

  // Пасивний дохід
  useEffect(() => {
    const passiveInterval = setInterval(() => {
      let duiktMultiplier = 1 + duiktCoins * 0.1;
      let income = passiveIncomeValue * duiktMultiplier;
      if (antibonus === 'halveIncome') {
        income = income / 2;
      }
      setCredits((prev) => prev + income);
    }, 1000);
    return () => clearInterval(passiveInterval);
  }, [passiveIncomeValue, duiktCoins, antibonus]);

  // // Антибонуси — викликаються кожні 10 хвилин
  // useEffect(() => {
  //   const antibonusInterval = setInterval(() => {
  //     const types = ['freeze', 'negativeClick', 'loseCredits'];
  //     const randomType = types[Math.floor(Math.random() * types.length)];
  //     triggerAntibonus(randomType);
  //   }, 10 * 60 * 1000); // 10 хвилин

  //   return () => clearInterval(antibonusInterval);
  // }, []);

  const triggerAntibonus = (type) => {
    playSound(antibonusSound);
    setAntibonus(type);

    if (antibonusTimerRef.current) clearInterval(antibonusTimerRef.current);

    switch (type) {
      case 'freeze':
        setAntibonusTimeLeft(60);
        antibonusTimerRef.current = setInterval(() => {
          setAntibonusTimeLeft((t) => {
            if (t <= 1) {
              setIsClickFrozen(false);
              setAntibonus(null);
              clearInterval(antibonusTimerRef.current);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
        setIsClickFrozen(true);
        break;

      case 'negativeClick':
        setAntibonusTimeLeft(60);
        antibonusTimerRef.current = setInterval(() => {
          setAntibonusTimeLeft((t) => {
            if (t <= 1) {
              setAntibonus(null);
              clearInterval(antibonusTimerRef.current);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
        break;

      case 'loseCredits':
        setAntibonusTimeLeft(3);
        antibonusTimerRef.current = setInterval(() => {
          setAntibonusTimeLeft((t) => {
            if (t <= 1) {
              setAntibonus(null);
              clearInterval(antibonusTimerRef.current);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
        setCredits((prev) => Math.max(prev - 1000, 0));
        break;

      case 'blockUpgrades':
        setAntibonusTimeLeft(30);
        antibonusTimerRef.current = setInterval(() => {
          setAntibonusTimeLeft((t) => {
            if (t <= 1) {
              setAntibonus(null);
              clearInterval(antibonusTimerRef.current);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
        break;

      case 'halveIncome':
        setAntibonusTimeLeft(40);
        antibonusTimerRef.current = setInterval(() => {
          setAntibonusTimeLeft((t) => {
            if (t <= 1) {
              setAntibonus(null);
              clearInterval(antibonusTimerRef.current);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
        break;

      default:
        break;
    }
  };

  // Очищення таймера при зміні антибонуса
  useEffect(() => {
    return () => {
      if (antibonusTimerRef.current) clearInterval(antibonusTimerRef.current);
    };
  }, []);

  // Додаємо бонуси від Duikt Coins
  const prestigeClickBonus = duiktCoins * 5;
  const prestigeMultiplierBonus = duiktCoins * 1;

  const earnCredits = () => {
    if (isClickFrozen) return;

    // 1% шанс отримати антибонус при кліку
    if (Math.random() < 0.05 && !antibonus) {
      const randomType = antibonusTypes[Math.floor(Math.random() * antibonusTypes.length)];
      triggerAntibonus(randomType);
      return;
    }

    let earned = (clickValue + prestigeClickBonus) * (multiplier + prestigeMultiplierBonus);
    if (Math.random() < comboChance) {
      earned *= 2;
    }
    if (antibonus === 'negativeClick') {
      earned = -earned;
    }
    setCredits((prev) => Math.max(prev + earned, 0));
  };

  const openCase = (cost, reward, currency = 'credits') => {
    if (currency === 'duikt') {
      if (duiktCoins >= cost) {
        const finalReward = Math.random() < doubleCaseChance ? reward * 2 : reward;
        setDuiktCoins((prev) => prev - cost + finalReward);
      }
    } else {
      if (credits >= cost) {
        const finalReward = Math.random() < doubleCaseChance ? reward * 2 : reward;
        setCredits((prev) => prev - cost + finalReward);
      }
    }
  };

  const buyUpgrade = (type, cost, value) => {
    if (credits >= cost) {
      console.log('buyUpgrade', type, cost, value);
      if (type === 'comboChance' && comboChance >= 1) return;
      if (type === 'doubleCaseChance' && doubleCaseChance >= 1) return;

      setCredits((prev) => prev - cost);
      switch (type) {
        case 'clickValue':
          setClickValue((prev) => prev + value);
          break;
        case 'comboChance':
          setComboChance((prev) => prev + value);
          break;
        case 'passiveIncome':
          setPassiveIncomeValue((prev) => prev + value);
          break;
        case 'multiplier':
          setMultiplier((prev) => prev + value);
          break;
        case 'doubleCaseChance':
          setDoubleCaseChance((prev) => prev + value);
          break;
        default:
          break;
      }
    }
  };

  const switchSkin = (skinId) => {
  if (!skins.includes(skinId)) {
    const selectedSkin = skinsData.find((skin) => skin.id === skinId);
    if (selectedSkin) {
      if (selectedSkin.currency === 'duikt') {
        if (duiktCoins >= selectedSkin.cost) {
          setDuiktCoins((prev) => prev - selectedSkin.cost);
          setSkins((prev) => [...prev, skinId]);
        } else {
          alert(`Недостатньо Duikt Coin для покупки ${selectedSkin.name}. Потрібно ${selectedSkin.cost}.`);
          return;
        }
      } else if (selectedSkin.currency === 'credits') {
        if (credits >= selectedSkin.cost) {
          setCredits((prev) => prev - selectedSkin.cost);
          setSkins((prev) => [...prev, skinId]);
        } else {
          alert(`Недостатньо кредитів для покупки ${selectedSkin.name}. Потрібно ${selectedSkin.cost}.`);
          return;
        }
      }
    }
  }
  setCurrentSkin(skinId);
};

  // Додайте цю функцію всередині useClicker:
  const addCredits = (amount) => {
    setCredits((prev) => prev + amount);
  };

  const applyPrestige = () => {
    // Додаємо 1 Duikt Coin за кожні 100 000 000 кредитів (або свою формулу)
    const prestigeGain = Math.floor(credits / 100000000);
    if (prestigeGain > 0) {
      setDuiktCoins((prev) => prev + prestigeGain);
    }
    // Скидаємо прогрес
    setCredits(0);
    setClickValue(1);
    setComboChance(0);
    setPassiveIncomeValue(0);
    setMultiplier(1);
    setDoubleCaseChance(0);
    // Можна залишити скіни та поточний скин, якщо це потрібно
  };

  // Збереження гри при зміні стану
  useEffect(() => {
    if (!loading) {
      saveGame({
        credits,
        duiktCoins,
        clickValue,
        passiveIncomeValue,
        multiplier,
        skins,
        currentSkin
      });
    }
  }, [
    credits,
    duiktCoins,
    clickValue,
    passiveIncomeValue,
    multiplier,
    skins,
    currentSkin,
    loading
  ]);

  return {
    loading,
    credits,
    duiktCoins,
    clickValue: clickValue + prestigeClickBonus,
    setClickValue, // ДОДАЙТЕ ЦЕ
    passiveIncomeValue,
    multiplier: multiplier + prestigeMultiplierBonus,
    doubleCaseChance,
    skins,
    currentSkin,
    comboChance,
    antibonus,
    isClickFrozen,
    earnCredits,
    openCase,
    buyUpgrade,
    switchSkin,
    addCredits,
    applyPrestige,
    triggerAntibonus,
    antibonusTimeLeft,
  };
};
