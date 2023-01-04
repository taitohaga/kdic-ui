import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { MainLayout } from '../../../components/layout';
import { useAuthorize } from '../../../utils/fetch';
import { Dictionary as DictionaryProps } from '../../dashboard';

export const getServerSideProps: GetServerSideProps<{ data: DictionaryProps }> =
  async context => {
    const dictionaryName = context.params?.dictionary_name;
    const data = await useAuthorize()
      .get(`/dic/i/${dictionaryName}`)
      .then(res => res.data);
    return {
      props: { data: data['dictionary'] },
    };
  };

export default function Dictionary(data: DictionaryProps) {}
