import React, { Fragment, useCallback } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { LibraryIcon, CogIcon, LogoutIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useUser } from '../../context/userContext';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const MenuBar = () => {
  const { user } = useUser();
  const router = useRouter();
  const toLibrary = () => {
    router.push('/library');
  };
  const toSettings = () => {
    router.push('/settings');
  };
  const logout = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        router.push('/');
        toast.success('ログアウトしました');
      })
      .catch(() => {
        console.log('error!!!');
      });
  }, []);

  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            className={`
            ${open ? '' : 'text-opacity-90'}
            text-white group px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <Image
              src={user.photoURL}
              alt=""
              width={48}
              height={48}
              className="rounded-full h-full w-full"
            ></Image>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-64 max-w-sm px-4 mt-3 right-1">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-4 bg-white p-4">
                  <a
                    className="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none"
                    onClick={toLibrary}
                  >
                    <LibraryIcon width={28} height={28} />

                    <p className="text-xl font-medium text-gray-900 ml-4">
                      ライブラリ
                    </p>
                  </a>
                  <a
                    className="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none"
                    onClick={toSettings}
                  >
                    <CogIcon width={28} height={28} />

                    <p className="text-xl font-medium text-gray-900 ml-4">
                      ユーザー設定
                    </p>
                  </a>
                  <a
                    className="flex items-center p-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none"
                    onClick={logout}
                  >
                    <LogoutIcon width={28} height={28} />

                    <p className="text-xl font-medium text-gray-900 ml-4">
                      ログアウト
                    </p>
                  </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default MenuBar;
