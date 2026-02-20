// components/CustomSelect.js
import React, { useState } from 'react';
import styles from './index.module.scss'; // Import CSS module for component-specific styling

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Call the onSelect function provided by the parent component
  };

  return (
    <div className={styles.customSelect}>
      <div
        className={styles.selectedOption}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : 'Select'}
      </div>
      {isOpen && (
        <ul className={styles.optionList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
