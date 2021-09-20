import React, { useEffect, useRef, useState } from 'react';
import { loadImage } from 'canvas';
import TweetImage from './TweetImage';
import domtoimage from 'dom-to-image';
import { ImageCreateButton } from './buttons/ImageCreateButton';
import { useRouter } from 'next/router';
import { useUser } from '../context/userContext';
import firebase from 'firebase/app';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

type props = {
  phrase: string;
};

const CreateImage = ({ phrase }: props) => {
  const container = useRef(null);
  const { user } = useUser();
  const [isAddPhrase, setIsAddPhrase] = useState(0);
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

  // フレーズ登録
  const addPhrase = () => {
    if (phrase === '') return;

    // ユニークIDを生成
    const id = firebase.firestore().collection('_').doc().id;

    // 日時取得
    const createdAt = format(new Date(), 'yyyy/MM/dd HH:mm:ss');
    user &&
      firebase
        .firestore()
        .doc(`users/${user.uid}/list/${id}`)
        .set({
          id,
          phrase: phrase,
          createdAt: createdAt,
        })
        .then(() => {
          toast.success('保存しました');
          setIsAddPhrase(1);
        })
        .catch(() => {
          console.log('error！');
        });
  };

  const exportToPng = (dom) => {
    domtoimage
      .toPng(dom)
      .then(function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  };
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
        <div className="text-center" ref={container}>
          <TweetImage png={png} width={width} height={height} />
        </div>
      )}

      <div className="py-2 text-center">
        {isAddPhrase || (
          <ImageCreateButton onClick={addPhrase}>
            画像を生成する
          </ImageCreateButton>
        )}

        <a
          className="bg-red-400 px-4 py-2 rounded-full text-center"
          onClick={() => exportToPng(container.current)}
        >
          StorageにUP！
        </a>
      </div>
    </div>
  );
};

export default CreateImage;
