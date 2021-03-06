import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  Fragment,
} from 'react';
import Header from '../../components/Header';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import CreateImage from '../../components/CreateImage';

const CreatePhrase = () => {
  // フレーズ削除のダイアログ表示ステイト
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  // フレーズのステイト
  const [phrase, setPhrase] = useState<string>('');

  return (
    <div className="bg-blue-100">
      <Header />
      <div className="container">
        <form className="pt-4 text-center">
          <textarea
            name=""
            id=""
            value={phrase}
            cols={38}
            rows={5}
            placeholder="お気に入りのフレーズを入力"
            className="border border-blue-400 rounded-md pl-3 pr-1 py-3 resize-none focus:outline-none focus:ring-1"
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              setPhrase(event.target.value);
            }}
          ></textarea>

          <div className="text-center py-4">
            <button className="text-xl font-bold px-4 py-2 bg-blue-400 text-white rounded-md">
              ツイートする
            </button>
          </div>
        </form>
        <div id="canvas">
          <CreateImage phrase={phrase} />
        </div>
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
                  この本をライブラリから削除しても宜しいですか？
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    実行するとツイート文も削除されます。
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

export default CreatePhrase;
