import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-gray-100 pt-10 pb-24">
      <div className="container">
        <div className="flex justify-center space-x-4">
          <Link href="/terms">
            <a className="text-gray-600">利用規約</a>
          </Link>
          <Link href="/privacypolicy">
            <a className="text-gray-600">プライバシーポリシー</a>
          </Link>
        </div>
        <div className="pt-4 text-center">
          <Link href="/">
            <a className="text-gray-600">当サービスの開発者</a>
          </Link>
          <p className="pt-4">&copy; OnePhrase</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
