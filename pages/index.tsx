import Head from 'next/head';

import { LandingLayout } from '../components/layout';
import {
  OutlinedButton,
  FilledButton,
  InputField,
} from '../components/controls';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kdic</title>
      </Head>
      <LandingLayout className="flex justify-center align-center">
        <div className="flex flex-row gap-12">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-center font-bold text-7xl">Kdic</h1>
            <h2 className="text-lg">オンラインで辞書を編集、公開、検索</h2>
          </div>
          <div>
            <div className="w-96 border-box rounded-lg bg-white drop-shadow-lg p-4">
              <form className="w-full border-box">
                <p className="mb-4 mt-8">ユーザー名</p>
                <InputField type="text" className="w-full" />
                <p className="mb-4 mt-8">パスワード</p>
                <InputField type="password" className="w-full" />
                <FilledButton className="w-full my-8">ログイン</FilledButton>
                <Link href="/register">
                  <OutlinedButton className="w-full">
                    アカウント作成
                  </OutlinedButton>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </LandingLayout>
    </div>
  );
}
