import React from 'react';
import styles from '../styles/SkinPanel.module.scss';

export const skinsData = [
  { id: 'light', name: 'Light Mode', cost: 0, description: 'Базовий світлий режим.', color: '#ffffff', currency: 'credits' },
  { id: 'dark', name: 'Dark Mode', cost: 1, description: 'Темний режим для очей. Купується за 1 Duikt Coin.', color: '#222831', currency: 'duikt' },
  { id: 'lightbrown', name: 'Light Brown Mode', cost: 1, description: 'Світло-коричневий стильний пісочний режим. Купується за 1 Duikt Coin.', color: '#e9cba7', currency: 'duikt' },
];

const SkinPanel = ({ credits, duiktCoins, currentSkin, skins, switchSkin }) => {
  const handleSkinPurchase = (skin) => {
    switchSkin(skin.id);
  };

  return (
    <div className={styles.skinPanel}>
      <h3>Скіни</h3>
      <div className={styles.skinsGrid}>
        {skinsData.map((skin) => (
          <div
            key={skin.id}
            className={`${styles.skinItem} ${currentSkin === skin.id ? styles.active : ''}`}
          >
            <div
              className={styles.skinColorPreview}
              style={{ background: skin.color }}
              title={skin.name}
            />
            <h4>{skin.name}</h4>
            <p>{skin.description}</p>
            <div className="skinPrice">
              Ціна: {
                skin.cost === 0
                  ? 'Безкоштовно'
                  : skins.includes(skin.id)
                    ? 'Вже куплено'
                    : skin.currency === 'duikt'
                      ? `${skin.cost} Duikt Coin`
                      : `${skin.cost} кредитів`
              }
            </div>
            <button
              onClick={() => handleSkinPurchase(skin)}
              disabled={
                currentSkin === skin.id ||
                (!skins.includes(skin.id) &&
                  ((skin.currency === 'duikt' && duiktCoins < skin.cost) ||
                  (skin.currency === 'credits' && credits < skin.cost)))
              }
            >
              {currentSkin === skin.id
                ? 'Активний'
                : skins.includes(skin.id)
                  ? 'Вибрати'
                  : 'Купити'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkinPanel;
