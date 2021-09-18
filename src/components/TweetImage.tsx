import Image from 'next/image';
import React from 'react';

const TweetImage = ({ png, height, width }) => {
  return (
    <Image
      alt="icon"
      src={png}
      height={height}
      width={width}
      className="rounded-lg text-center"
    />
  );
};

export default TweetImage;
