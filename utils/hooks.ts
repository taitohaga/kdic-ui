import useSWR, { useSWRConfig } from 'swr';
import { useState, useEffect } from 'react';

function useUser() {
  const { mutate: refetch } = useSWRConfig();
  const { data: user, isLoading, error, mutate } = useSWR('/auth/profile');
  return { user, isLoading, error, mutate, refetch };
}

function useDefaultDict() {
  const [dict, setDict] = useState<string | undefined>();

  useEffect(() => {
    const defaultDict = localStorage.getItem('default_dict');
    if (defaultDict) {
      setDict(_ => defaultDict);
    }
  });
  useEffect(() => {
    dict && localStorage.setItem('default_dict', dict);
  }, [dict]);

  return { dict, setDict };
}

export { useDefaultDict, useUser };
