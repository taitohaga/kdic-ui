import * as React from 'react';

import { AUTHOR, YEAR } from '../utils/const';

function Footer() {
  return (
    <footer className="bg-rose-500 h-12 flex flex-col">
      <p className="text-slate-100 my-auto px-4">
        {YEAR} {AUTHOR}
      </p>
    </footer>
  );
}

export default Footer;
