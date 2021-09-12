import Image from 'next/image';
import React, { Fragment, useState } from 'react';
import Header from '../components/Header';
import { useUser } from '../context/userContext';
import { Dialog, Transition } from '@headlessui/react';
import firebase from 'firebase/app';
import 'firebase/functions';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Settings = () => {
  const router = useRouter();
  const { user } = useUser();
  // アカウント削除時のダイアログ表示ステイト
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  // アカウント削除
  const deleteUser = () => {
    closeModal();
    if (!user) return null;
    const callable = firebase
      .app()
      .functions('asia-northeast1')
      .httpsCallable('deleteUser');
    callable({})
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            router.push('/');
            toast.success('アカウント削除しました');
          })
          .catch(() => {
            console.error('ログアウト失敗しました！');
          });
      })
      .catch(() => {
        console.error('アカウント削除失敗しました！');
      });
  };

  return (
    <div className="">
      <Header />
      <div className="container">
        <h1 className="pt-4 text-center font-bold text-xl">ユーザー設定</h1>

        {user ? (
          <>
            <div className="pt-8 flex flex-col items-center space-y-4">
              <div className="">
                <Image
                  src={user.photoURL}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-full h-full w-full"
                ></Image>
              </div>
              <div>
                <p className="font-semibold">{user.displayName}</p>
              </div>

              <p className="text-gray-600">
                このサイトではプロフィールの変更はできません。Twitterのアカウント情報がそのまま反映されます。(ログイン時に反映されます。)
              </p>
            </div>
            <div className="text-right pt-8 pb-4">
              <a
                className="opacity-50 underline hover:opacity-30 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                アカウントを削除→
              </a>
            </div>
          </>
        ) : (
          <div className="text-center pt-8 pb-60 text-gray-500">
            ログインして下さい
          </div>
        )}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  本サービスからアカウントを削除しても宜しいですか？
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    実行すると作成されたライブラリは全て削除され、戻すことはできません。
                  </p>
                </div>

                <div className="mt-8 text-right space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeModal}
                  >
                    キャンセル
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={deleteUser}
                  >
                    削除する
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Settings;
