import React from 'react';
import Link from 'next/link';

export const PhraseCard = ({ data }) => {
  return (
    <div className="bg-white border rounded-md p-1 pb-2 mb-2 relative">
      <div className="h-48 text-center p-2 text-gray-500 mb-4">
        {data.phrase}
      </div>
      <div className="flex items-center justify-between px-2 pt-1 border-t">
        <div>
          登録日:<span>{data.createdAt.substr(0, 10)}</span>
        </div>

        <Link href="#">
          <a className="bg-blue-400 text-white rounded-md py-2 px-4">
            編集する
          </a>
        </Link>
      </div>
    </div>
  );
};
