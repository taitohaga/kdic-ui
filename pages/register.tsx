import Head from 'next/head';
import * as React from 'react';

import { LandingLayout } from '../components/layout';
import {
  OutlinedButton,
  FilledButton,
  InputField,
} from '../components/controls';

export default function Register() {
  return (
    <div>
      <Head>
        <title>アカウント作成</title>
      </Head>
      <LandingLayout>
        <div className="flex flex-col gap-8 justify-center items-center">
          <h1 className="text-lg font-bold">アカウントを作成する</h1>
          <div className="w-full border-box rounded-lg bg-white drop-shadow-lg p-4">
            <form className="w-full border-box">
              <p className="mb-4 mt-8">ユーザー名</p>
              <InputField type="text" className="w-full" />
              <p className="mb-4 mt-8">表示名</p>
              <InputField type="text" className="w-full" />
              <p className="mb-4 mt-8">メールアドレス</p>
              <InputField type="email" className="w-full" />
              <p className="mb-4 mt-8">パスワード</p>
              <InputField type="password" className="w-full" />
              <FilledButton className="w-full my-8">
                アカウント作成
              </FilledButton>
            </form>
          </div>
        </div>
      </LandingLayout>
    </div>
  );
}
