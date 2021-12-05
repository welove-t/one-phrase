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
  const width = 480;
  const height = 270;
  const fontSize = 24;
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

    setPng(canvasElem.toDataURL());
  }, [bgColor, foColor, phrase]);

  // 画像アップロード（Storage）
  const upload = (image, storageURL) => {
    const storageRef = firebase.storage().ref();
    const imagesRef = storageRef.child(storageURL);
    imagesRef
      .putString(image, 'data_url')
      .then(() => {
        console.log('success!!!');
      })
      .catch(() => {
        console.log('miss!');
      });
  };

  // フレーズ登録
  const addPhrase = async (domPhrase) => {
    if (phrase === '' && domPhrase === '') return;

    // ユニークIDを生成
    const id = firebase.firestore().collection('_').doc().id;

    const storageURL = `${user.uid}/${id}.png`;
    // 画像アップ
    const imagePhraseURL = await exportToPng(domPhrase);

    // 画像アップ
    await upload(imagePhraseURL, storageURL);

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
          imageURL: storageURL,
        })
        .then(() => {
          toast.success('保存しました');
          setIsAddPhrase(1);
        })
        .catch(() => {
          console.log('error！');
        });
  };

  // dom→イメージ生成
  const exportToPng = (dom) => {
    const data_url = domtoimage
      .toPng(dom)
      .then((dataUrl) => {
        let img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
        return dataUrl;
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
        return error;
      });
    return data_url;
  };
  return (
    <div className="text-center">
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
        <div className="sm:w-96 sm:h-52 mx-auto mb-4">
          {/* <TweetImage png={png} width={width} height={height} ref={container} /> */}
          <img
            alt="icon"
            src={png}
            height={height}
            width={width}
            className="rounded-lg"
            ref={container}
          />
        </div>
      )}

      <div className="py-2">
        {isAddPhrase || (
          <ImageCreateButton onClick={() => addPhrase(container.current)}>
            画像を生成する
          </ImageCreateButton>
        )}
      </div>
    </div>
  );
};

export default CreateImage;
