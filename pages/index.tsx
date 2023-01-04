import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LandingLayout } from '../components/layout';
import {
  OutlinedButton,
  FilledButton,
  InputField,
} from '../components/controls';
import { useAuthorize } from '../utils/fetch';

interface LoginForm {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const axios = useAuthorize();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: '',
    password: '',
  });

  useEffect(() => {
    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('access_token')
        : undefined;
    const refresh =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('refresh_token')
        : undefined;
    if (token && refresh) {
      router.push('/dashboard');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm(val => ({ ...val, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(loginForm);
    axios
      .post('/auth/login', loginForm)
      .then(res => {
        window.localStorage.setItem('access_token', res.data.token);
        window.localStorage.setItem('refresh_token', res.data.refresh_token);
        console.log(res);
        router.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Head>
        <title>Kdic</title>
      </Head>
      <LandingLayout className="flex justify-center align-center">
        <div className="flex flex-row gap-12">
          <div className="flex flex-col gap-4 justify-center">
            <h1 className="text-center font-bold text-7xl text-transparent bg-clip-text bg-gradient-to-r from-rose-800 to-purple-400">
              Kdic
            </h1>
            <h2 className="text-lg">オンラインで辞書を編集、公開、検索</h2>
          </div>
          <div>
            <div className="w-96 border-box rounded-lg bg-white drop-shadow-lg p-4">
              <form className="w-full border-box">
                <p className="mb-4 mt-8">ユーザー名</p>
                <InputField
                  name="username"
                  type="text"
                  className="w-full"
                  value={loginForm.username}
                  onChange={handleChange}
                />
                <p className="mb-4 mt-8">パスワード</p>
                <InputField
                  name="password"
                  type="password"
                  className="w-full"
                  value={loginForm.password}
                  onChange={handleChange}
                />
                <FilledButton className="w-full my-8" onClick={handleLogin}>
                  ログイン
                </FilledButton>
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
