import React, { useState } from "react";

interface ResizableImageProps {
  src: string;
  width: number;
  height: number;
  onChange: (width: number, height: number) => void;
}

const ResizableImage: React.FC<ResizableImageProps> = ({ src, width, height, onChange }) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [resizing, setResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!resizing) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const newWidth = Math.max(0, width + dx);
    const newHeight = Math.max(0, height + dy);
    onChange(newWidth, newHeight);
  };

  const handleMouseUp = () => {
    setResizing(false);
  };

  return (
    <img
      src={src}
      alt="Resizable Image"
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default ResizableImage;
