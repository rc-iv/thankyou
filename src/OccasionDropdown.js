import React, { useState } from 'react';
import styles from './OccasionDropdown.module.css';

function OccasionDropdown({ onOccasionChange, babyName, setBabyName, giverName, setGiverName }) {
  const [occasion, setOccasion] = useState('baby shower');

  const renderBabyNameInput = () => {
    if (occasion === 'baby shower') {
      return (
        <div className="mt-2">
          <label className="text-blue-600" htmlFor="babyName">Baby's Name:</label>
          <input
            id="babyName"
            type="text"
            value={babyName}
            onChange={(e) => {
              setBabyName(e.target.value);
              onOccasionChange(occasion, e.target.value, giverName);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.occasionDropdown}>
      <label className="text-blue-600" htmlFor="occasion">Choose an occasion:</label>
      <select
        id="occasion"
        className={styles.occasionSelect}
        value={occasion}
        onChange={(e) => {
          setOccasion(e.target.value);
          onOccasionChange(e.target.value, babyName, giverName);
        }}
      >
        <option value="baby shower">Baby Shower</option>
        <option value="wedding">Wedding</option>
        <option value="birthday">Birthday</option>
      </select>
      {renderBabyNameInput()}
    </div>
  );
}

export default OccasionDropdown;
