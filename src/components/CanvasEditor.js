import React, { useEffect, useRef, useState } from 'react';
import { CanvasTemplate } from '../helpers/CanvasTemplate';
import ColorPicker from './ColorPicker';

const CanvasEditor = () => {
  const [background, setBackground] = useState("#0369A1");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("Your caption here");
  const [ctaText, setCtaText] = useState("Call to Action");
  const canvasRef = useRef(null);

 useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const template = new CanvasTemplate(canvasEl, background, image, caption, ctaText);
    template.draw();
}, [background, image, caption, ctaText]);


  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (!file) {
      return; 
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result); 
    };
    reader.readAsDataURL(file);
  };

  const handleBackgroundColorChange = (color) => {
    setBackground(color);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <canvas ref={canvasRef} width="1080" height="1080" style={{ width: '50vw', height: 'auto' }}></canvas>
      </div>
      <div className="flex-1 p-8 space-y-4 bg-white">
        <h1 className="text-xl font-bold">Ad Customization</h1>
        <input type="file" onChange={handleImageUpload} accept="image/*" className="block w-full text-sm" />
        <input 
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter caption"
          className="input input-bordered w-full p-2 border-2 border-blue-500 focus:border-blue-700"
        />
        <input 
          type="text"
          value={ctaText}
          onChange={(e) => setCtaText(e.target.value)}
          placeholder="Enter Call to Action"
          className="input input-bordered w-full p-2 border-2 border-blue-500 focus:border-blue-700"
        />
        <ColorPicker currentColor={background} onChangeColor={handleBackgroundColorChange} />
      </div>
    </div>
  );
}

export default CanvasEditor;
