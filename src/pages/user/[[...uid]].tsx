import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useUser } from '../../context/userContext';

const LibraryUser = () => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
  });

  return (
    <div className="bg-blue-50 pb-40">
      <Header />
      <div className="container">
        <h1 className="py-8 text-center font-bold text-2xl">マイライブラリ</h1>

        <div className="bg-white border rounded-md p-1 pb-2 mb-2 relative">
          <div className="h-48 text-center p-2 text-gray-500 mb-4">
            イメージ
          </div>
          <div className="flex items-center justify-between px-2 pt-1 border-t">
            <div>
              登録日:<span>2021/10/01</span>
            </div>

            <Link href="#">
              <a className="bg-blue-400 text-white rounded-md py-2 px-4">
                編集する
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryUser;
