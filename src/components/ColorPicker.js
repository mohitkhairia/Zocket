import React, { useState } from 'react';

const ColorPicker = ({ currentColor, onChangeColor }) => {
  const [recentColors, setRecentColors] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (color) => {
    onChangeColor(color);
    setShowPicker(false); 
    updateRecentColors(color);
  };

  const updateRecentColors = (newColor) => {
    if (recentColors.includes(newColor)) {
      return;
    }
    
    const updatedColors = [newColor, ...recentColors].slice(0, 5);
    setRecentColors(updatedColors);
  };

  return (
    <div className="color-picker">
      <div className="flex items-center space-x-2">
        {recentColors.map((color, index) => (
          <button
            key={index}
            style={{ backgroundColor: color, width: '36px', height: '36px', borderRadius: '50%' }}
            onClick={() => handleColorChange(color)}
            aria-label={`Select ${color}`}
          ></button>
        ))}
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="bg-gray-200 p-2 rounded-full"
          aria-label="Open color picker"
        >
          +
        </button>
      </div>

      {showPicker && (
        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default ColorPicker;
