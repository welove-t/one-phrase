import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="bg-blue-400 py-6">
      <div className="container">
        <div className="text-center py-2">
          <p className="text-white font-bold text-3xl">あなたの心に響いた</p>
          <p className="text-white font-bold text-3xl">
            <span className="text-yellow-400 font-extrabold">珠玉の一文</span>を
          </p>
          <p className="text-white font-bold text-3xl">ツイートしよう</p>
        </div>
        <div className="text-center">
          <Image
            src="/images/book_img_320.png"
            alt=""
            width={320}
            height={247}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
