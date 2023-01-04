import * as React from 'react';

import { LandingNavbar, Navbar } from './navbar';
import Footer from './footer';

export function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`h-full m-auto max-w-screen-lg ${className ? className : ''}`}
    >
      {children}
    </div>
  );
}

function Main({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={`min-h-screen box-border text-slate-800 w-full px-2 ${
        className ? className : ''
      }`}
    >
      <Container>{children}</Container>
    </main>
  );
}

export function LandingLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <LandingNavbar />
      <Main className={`bg-slate-100 py-4 ${className ? className : ''}`}>
        {children}
      </Main>
      <Footer />
    </>
  );
}

export function MainLayout({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <Navbar />
      <Main className={`bg-slate-100 py-4 ${className ? className : ''}`}>
        {children}
      </Main>
      <Footer />
    </>
  );
}
