import React from "react";
import { HexColorPicker } from "react-colorful";

interface ColorSelectorProps {
  onChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onChange }) => {
  const handleChange = (color: string) => {
    onChange(color);
  };

  return (
    <div style={{ position: "absolute", zIndex: 1 }}>
      <HexColorPicker onChange={handleChange} />
    </div>
  );
};

export default ColorSelector;
