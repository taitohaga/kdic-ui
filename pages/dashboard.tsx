import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import useSWR from 'swr';

import { MainLayout } from '../components/layout';
import { DictList, DictItem, WordList, WordItem } from '../components/lists';
import { logout } from '../utils/fetch';

export interface Dictionary {
  dictionary_id: number;
  dictionary_name: string;
  dictionary_display_name: string;
  owner_id: number;
  description: string;
  image_url?: string;
  scansion_url?: string;
  created_at: Date;
  updated_at: Date;
  word_count: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { data, isLoading, error } = useSWR('/dic/my');
  useEffect(() => {
    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('access_token')
        : undefined;
    const refresh =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('refresh_token')
        : undefined;
    if (!(token && refresh)) {
      console.log(token, refresh);
      router.push('/');
    }
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (error && error.name === 'RELOGIN_REQUIRED') {
      logout();
      router.push('/');
    }
  }, [error]);
  return (
    <div>
      <Head>
        <title>Kdic</title>
      </Head>
      <MainLayout>
        <div className="grid grid-cols-4 border-box gap-4">
          <div>
            <h1 className="text-md">最近編集した単語</h1>
            <WordList>
              <WordItem
                headword="fistir"
                translation={`【動詞】ぴすてぃるする\n【独立詞】(あいさつ) ぴすてぃる`}
                example={`Am wana fistir di kas. -- 私は彼女にぴすてぃるしたいです。`}
                updatedAt={new Date(2022, 11, 31, 19, 0, 0)}
              />
              <WordItem
                headword="am"
                translation={`【代名詞】わたし\n格変化: am / amn / arm`}
                updatedAt={new Date(2022, 11, 30, 22, 30, 0)}
              />
              <WordItem
                headword="kas"
                translation="【代名詞】彼女"
                updatedAt={new Date(2022, 10, 23, 22, 30, 0)}
              />
            </WordList>
          </div>
          <div className="col-span-2">
            <h1 className="text-lg">あなたの辞書</h1>
            <DictList>
              {isLoading ? (
                <>読み込み中</>
              ) : error ? (
                <>エラー!</>
              ) : data ? (
                (data['dictionaries'] as Dictionary[]).map(dict => (
                  <DictItem
                    key={dict.dictionary_id}
                    dictionaryName={dict.dictionary_name}
                    dictionaryDisplayName={dict.dictionary_display_name}
                    wordCount={dict.word_count}
                  />
                ))
              ) : null}
            </DictList>
          </div>
          <div>単語をメンテナンスしませんか？</div>
        </div>
      </MainLayout>
    </div>
  );
}
