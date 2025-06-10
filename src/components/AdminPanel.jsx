import React from 'react';
import styles from '../styles/AdminPanel.module.scss';

const AdminPanel = ({ addClickValue }) => (
  <div className={styles.adminPanel}>
    <button onClick={addClickValue}>+10 000 000 до кліку</button>
    <button
      style={{ marginLeft: 10, background: '#ff5252' }}
      onClick={() => {
        indexedDB.deleteDatabase('DuiktClickerDB');
        window.location.reload();
      }}
    >
      Скинути прогрес
    </button>
  </div>
);

export default AdminPanel;