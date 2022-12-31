import Head from 'next/head';
import * as React from 'react';

import { LandingLayout } from '../components/layout';
import { formatDatedelta, jaTimeunit } from '../utils/date';
import { DictList, DictItem, WordList, WordItem } from '../components/lists';

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Kdic</title>
      </Head>
      <LandingLayout>
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
              <DictItem
                dictionaryName="yuugokku"
                dictionaryDisplayName="ユーゴック語"
                wordCount={17}
              />
              <DictItem
                dictionaryName="keinatwok"
                dictionaryDisplayName="ケイナトウォク語"
                wordCount={17}
              />
            </DictList>
          </div>
          <div>単語をメンテナンスしませんか？</div>
        </div>
      </LandingLayout>
    </div>
  );
}
