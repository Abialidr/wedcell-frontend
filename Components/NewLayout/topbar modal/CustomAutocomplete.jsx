// components/CustomAutocomplete.js
import { useState } from 'react';

function CustomAutocomplete({ options, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    // Filter options based on input value
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filteredOptions);
  };

  const handleSelect = (selectedOption) => {
    onSelect(selectedOption);
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Type something...'
      />
      <ul>
        {suggestions.map((option, index) => (
          <li
            style={{ color: 'black' }}
            key={index}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomAutocomplete;
