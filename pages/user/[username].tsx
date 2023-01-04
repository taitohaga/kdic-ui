import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useAuthorize } from '../../utils/fetch';
import { MainLayout } from '../../components/layout';

interface UserProps {
  id: number;
  username: string;
  display_name: string;
  avatar_url?: string;
  profile?: string;
}

export const getServerSideProps: GetServerSideProps<{ data: UserProps }> =
  async context => {
    const username = context.params?.username;
    const data = await useAuthorize()
      .get(`/auth/i/${username}`)
      .then(res => res.data);
    return {
      props: {
        data: data['user'],
      },
    };
  };

export default function User({
  data: user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(user);
  return (
    <div>
      <Head>
        <title>{user.username} - Kdic</title>
      </Head>
      <MainLayout className="">名前: {user.display_name}</MainLayout>
    </div>
  );
}
