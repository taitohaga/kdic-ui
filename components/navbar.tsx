import * as React from 'react';
import Link from 'next/link';

import { Container } from './layout';

export function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-10 drop-shadow-md bg-rose-500 h-12 text-slate-100 px-2">
      <Container className="flex items-center gap-4">
        <div className="flex flex-col grow">
          <span className="font-semibold">
            <Link href="/">Kdic</Link>
          </span>
        </div>
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
        <div>
          <span className="">
            <Link href="/">ログアウト</Link>
          </span>
        </div>
      </Container>
    </nav>
  );
}

export function Navbar() {
  return (
    <nav className="drop-shadow-md bg-rose-500 h-12 tet-slate-100 px-2">
      <Container className="flex items-center"></Container>
    </nav>
  );
}
