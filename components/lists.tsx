import * as React from 'react';

import { formatDatedelta, jaTimeunit } from '../utils/date';

export function DictList({ children }: React.PropsWithChildren) {
  return <ul className="list-none flex flex-col gap-4">{children}</ul>;
}

interface DictItemProps {
  dictionaryName: string;
  dictionaryDisplayName: string;
  wordCount: number;
  wordCountHistory?: number[];
}

export function DictItem({
  dictionaryName,
  dictionaryDisplayName,
  wordCount,
}: DictItemProps) {
  return (
    <li className="w-full p-4 bg-white rounded-lg drop-shadow-md">
      <div className="flex flex-row">
        <span className="text-md mr-2 grow">{dictionaryDisplayName}</span>
        <span className="text-sm">{wordCount} 語</span>
      </div>
      <span className="text-sm font-mono bg-slate-100 rounded-ms">
        {dictionaryName}
      </span>
    </li>
  );
}

interface WordItemProps {
  headword: string;
  translation?: string;
  example?: string;
  updatedAt: Date;
}

export function WordList({ children }: React.PropsWithChildren) {
  return <ul className="list-none flex flex-col gap-4">{children}</ul>;
}

export function WordItem({
  headword,
  translation,
  example,
  updatedAt,
}: WordItemProps) {
  const { delta, unit } = formatDatedelta(updatedAt, new Date());
  return (
    <li className="w-full p-4 bg-white rounded-lg drop-shadow-md">
      <div className="text-lg font-bold mr-2 grow">{headword}</div>
      <div className="whitespace-pre-wrap">{translation}</div>
      <div className="whitespace-pre-wrap">{example}</div>
      <span className="text-sm font-slate-500">
        最終更新: {delta} {jaTimeunit(unit)}前
      </span>
    </li>
  );
}
