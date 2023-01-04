import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { InputField, OutlinedButton, FilledButton } from './controls';
import { Container } from './layout';
import { logout, useAuthorize } from '../utils/fetch';
import { useRouter } from 'next/router';
import { useUser } from '../utils/hooks';

interface NavbarProfileProps {
  username: string;
  displayName: string;
  avatarUrl?: string;
}

function NavbarProfile({ username, displayName }: NavbarProfileProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen(val => !val);
  };
  return (
    <>
      <div className="flex flex-col">
        <div>
          <p className="text-md hover:underline" onClick={toggle}>
            {displayName}
            <span className="text-sm font-mono font-semibold">
              ({username})
            </span>
          </p>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } box-border p-2 z-20 w-36 bg-rose-500 rounded-md drop-shadow-md absolute top-16`}
          >
            <ul className="list-none flex flex-col" onClick={toggle}>
              <li>
                <Link href={`/user/${username}`}>プロフィール</Link>
              </li>
              <li>
                <Link
                  href="#"
                  onClick={(e: React.MouseEvent<HTMLLinkElement>) => {
                    e.preventDefault();
                    logout();
                    router.push('/');
                  }}
                >
                  ログアウト
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-screen z-10 opacity-100`}
        onClick={toggle}
      ></div>
    </>
  );
}

export function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-10 drop-shadow-md bg-rose-500 h-12 text-slate-100 px-2">
      <Container className="flex items-center gap-4">
        <div className="flex flex-col grow">
          <span className="font-semibold">
            <Link href="/">Kdic</Link>
          </span>
        </div>
      </Container>
    </nav>
  );
}

interface LoginForm {
  username: string;
  password: string;
}

function NavbarLogin() {
  const { refetch } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const axios = useAuthorize();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: '',
    password: '',
  });

  const toggle = () => {
    setIsOpen(val => !val);
  };

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
        refetch('/auth/profile');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <div>
          <p className="text-md hover:underline" onClick={toggle}>
            ログイン
          </p>
          <form
            className={`${
              isOpen ? 'block' : 'hidden'
            } box-border p-2 z-20 w-72 bg-white rounded-md drop-shadow-md absolute top-16`}
          >
            <p className="mb-4 mt-8 text-slate-800">ユーザー名</p>
            <InputField
              name="username"
              type="text"
              className="w-full"
              value={loginForm.username}
              onChange={handleChange}
            />
            <p className="mb-4 mt-8 text-slate-900">パスワード</p>
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
              <OutlinedButton className="w-full">アカウント作成</OutlinedButton>
            </Link>
          </form>
        </div>
      </div>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } fixed top-0 left-0 w-full h-screen z-10 opacity-100`}
        onClick={toggle}
      ></div>
    </>
  );
}

export function Navbar() {
  const { user, isLoading, error } = useUser();
  return (
    <nav className="sticky top-0 z-10 drop-shadow-md bg-rose-500 h-12 text-slate-100 px-2">
      <Container className="flex items-center gap-4">
        <div className="flex flex-col grow">
          <span className="font-semibold">
            <Link href="/">Kdic</Link>
          </span>
        </div>
        {isLoading ? (
          <NavbarLogin />
        ) : error ? (
          <NavbarLogin />
        ) : user ? (
          <>
            <div>
              <span className="">
                <Link href="/">単語を追加</Link>
              </span>
            </div>
            <div>
              <span className="">
                <Link href="/">辞書を作成</Link>
              </span>
            </div>
            <NavbarProfile
              username={user['username']}
              displayName={user['display_name']}
            />
          </>
        ) : null}
      </Container>
    </nav>
  );
}
