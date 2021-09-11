import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../../context/userContext';

const BottomNavi = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="w-full">
      <section className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
        <div id="tabs" className="flex justify-between">
          <Link href="/phrase/new">
            <a className="w-full focus:text-green-500 hover:text-green-500 justify-center inline-block text-center pt-2 pb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 inline-block mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="block text-xs">新規作成</span>
            </a>
          </Link>
          {/* <Link href={user && `/user/${user.uid}/library`}> */}
          <a
            className="w-full focus:text-green-500 hover:text-green-500 justify-center inline-block text-center pt-2 pb-1"
            onClick={() => {
              user && router.push(`/list`);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 inline-block mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>
            <span className="block text-xs">ライブラリ</span>
          </a>
          {/* </Link> */}
          <Link href="/settings">
            <a className="w-full focus:text-green-500 hover:text-green-500 justify-center inline-block text-center pt-2 pb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 inline-block mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="block text-xs">ユーザー設定</span>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BottomNavi;
