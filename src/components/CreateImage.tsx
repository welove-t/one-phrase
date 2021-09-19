import React, { useEffect, useState } from 'react';
import { loadImage } from 'canvas';
import TweetImage from './TweetImage';

type props = {
  phrase: string;
};

const CreateImage = ({ phrase }: props) => {
  // canvas用
  const [bgColor, setBgColor] = useState<string>('#888888');
  const [foColor, setFoColor] = useState<string>('#000000');
  const [png, setPng] = useState<string | null>(null);
  const width = 350;
  const height = 190;
  const fontSize = 16;
  const lineHeight = 1.5;

  useEffect(() => {
    const canvasElem = document.createElement('canvas');
    canvasElem.width = width;
    canvasElem.height = height;

    const ctx = canvasElem && canvasElem.getContext('2d');

    if (!canvasElem || !ctx) return;

    // draw
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px Hiragino Maru Gothic Pro';
    ctx.fillStyle = foColor;

    for (let lines = phrase.split('\n'), i = 0, l = lines.length; l > i; i++) {
      let line = lines[i];
      let addY = fontSize;
      if (i) addY += fontSize * lineHeight * i;

      ctx.fillText(line, width / 20 + 0, height / 8 + addY);
    }

    // ctx.fillText(phrase, width / 20, height / 4);
    // const img = new Image();
    // img.crossOrigin = 'Anonymous';
    // img.src =
    //   'https://1.bp.blogspot.com/-lCWO2hySU1s/YFVT6vAeUnI/AAAAAAABdh8/cObdcCdkySQwdxiJzKFWOl_vhRBNNi62QCNcBGAsYHQ/s884/present_hanataba_flower_girl.png';
    // img.src = data.imgUrl;
    // img.onload = () => {
    //   ctx.drawImage(img, 0, 0);
    // };
    setPng(canvasElem.toDataURL());
  }, [bgColor, foColor, phrase]);
  return (
    <div>
      <h3>画像生成</h3>
      <h4>背景色</h4>
      {['#f00', '#0f0', '#00f'].map((color) => (
        <button
          key={color}
          style={{ background: color }}
          onClick={() => setBgColor(color)}
        >
          {color}
        </button>
      ))}
      <h4>文字色</h4>
      {['#f00', '#0f0', '#00f'].map((color) => (
        <button key={color} style={{ color }} onClick={() => setFoColor(color)}>
          {color}
        </button>
      ))}
      <h4>生成</h4>
      {png && (
        // <div className="bg-white rounded-lg w-80 text-center mx-auto space-x-2">
        //   <Image
        //     id="bookImage_canvas"
        //     src={data.imgUrl}
        //     alt=""
        //     width={120}
        //     height={180}
        //     loading="lazy"
        //   ></Image>
        // </div>
        <div className="text-center">
          <TweetImage png={png} width={width} height={height} />
        </div>
      )}
    </div>
  );
};

export default CreateImage;
