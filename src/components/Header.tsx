import React, { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../context/userContext';
import firebase from 'firebase/app';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';

const Header = () => {
  // ログイン時のダイアログ表示ステイト
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const login = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(() => {
        closeModal();
      });
  };
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('ログアウトしました');
      })
      .catch(() => {
        console.log('error!!!');
      });
  };

  const { user, loadingUser } = useUser();
  useEffect(() => {
    console.log(user);
  });
  return (
    <div className="bg-blue-400">
      <header className="container h-16 flex items-center">
        <Link href="/">
          <a className="font-bold text-2xl text-white">１- Phrase</a>
        </Link>
        <span className="flex-1"></span>
        {user && (
          <button className="mr-4" onClick={logout}>
            ログアウト
          </button>
        )}
        {loadingUser ? (
          <div className="animate-pulse">
            <div className="h-12 w-12 rounded-full bg-gray-300"></div>
          </div>
        ) : user ? (
          <Image
            src={user.photoURL}
            alt=""
            width={48}
            height={48}
            className="rounded-full h-full w-full"
          ></Image>
        ) : (
          <a
            className="text-white border border-white rounded-md py-2 px-4"
            onClick={() => setIsOpen(true)}
          >
            ログイン
          </a>
        )}
      </header>
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-xl leading-6 text-gray-900 font-bold"
                >
                  さあ、始めよう！
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center space-x-2 px-6 py-2 text-xl font-medium text-white bg-twitter border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    onClick={login}
                  >
                    <Image
                      height={20}
                      width={20}
                      src="/images/twitter-logo-white.svg"
                      alt=""
                      className="mx-8"
                    ></Image>
                    <p className="">Twitterでログイン</p>
                  </button>
                </div>
                <p className="mt-4">Twitterアカウントのみ利用できます</p>
                <p className="mt-2 text-xs">
                  本サービスは自動でツイートすることはありません
                </p>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Header;
