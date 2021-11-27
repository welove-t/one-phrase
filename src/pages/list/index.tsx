import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { useUser } from '../../context/userContext';
import firebase from 'firebase/app';
import { PhraseCard } from '../../components/list/PhraseCard';
import Image from 'next/image';

const List = () => {
  const { user } = useUser();
  const router = useRouter();

  const [phraseList, setPhraseList] = useState(null);
  const [phraseImage, setPhraseImage] = useState();
  const getList = () => {
    user &&
      firebase
        .firestore()
        .collection(`users/${user.uid}/list`)
        .orderBy('createdAt', 'desc')
        .get()
        .then((items) => {
          const res = items.docs.map((doc) => {
            return { pid: doc.id, ...doc.data() };
          });
          setPhraseList(res);
        })
        .catch(() => {
          console.log('error!');
        });
  };

  const getPhrase = () => {
    const storageRef = firebase
      .storage()
      .ref()
      .child(`${user.uid}/2021-11-27 11:36:22.png`);
    storageRef.getDownloadURL().then((url) => {
      console.log(url);
      setPhraseImage(url);
    });
  };
  useEffect(() => {
    getList();
    getPhrase();
  }, [user]);

  return (
    <div className="bg-blue-50 pb-40">
      <Header />
      <div className="container">
        <h1 className="py-8 text-center font-bold text-2xl">
          あなたのフレーズリスト
        </h1>
        {phraseImage && <img src={phraseImage} />}
        {user ? (
          phraseList ? (
            phraseList.length === 0 ? (
              <div className="text-center text-gray-500 pt-8 pb-80">
                <p>リストにフレーズはありません</p>
                <p>フレーズを作成して下さい</p>
              </div>
            ) : (
              phraseList.map((data, idx) => (
                <PhraseCard data={data} key={idx}></PhraseCard>
              ))
            )
          ) : (
            <div className="text-center text-gray-500">
              <p>読み込み中</p>
            </div>
          )
        ) : (
          <div className="text-center text-gray-500 pt-4 pb-80">
            <p>ログインして下さい</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
