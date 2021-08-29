import React from 'react';

const Recently = () => {
  return (
    <div className="bg-blue-100 py-8">
      <div className="container">
        <h2 className="text-xl">最近のツイート</h2>
        <div className="mt-4 h-40 w-full bg-white rounded-md"></div>
        <div className="mt-4 h-40 w-full bg-white rounded-md"></div>
        <div className="mt-4 h-40 w-full bg-white rounded-md"></div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-blue-400 text-white px-12 py-4 rounded-full hover:shadow hover:opacity-80 focus:outline-none focus:ring-2">
          使ってみる
        </button>
      </div>
    </div>
  );
};

export default Recently;
