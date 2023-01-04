import axios from 'axios';
import { API_URL } from './const';

function useAuthorize() {
  const token =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('access_token')
      : undefined;
  const refresh =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('refresh_token')
      : undefined;
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    res => res,
    err => {
      if (err.response.status === 401 && token) {
        console.log('refreshing token', err);
        const result = axios
          .post(
            '/auth/refresh',
            { refresh_token: refresh },
            { baseURL: API_URL }
          )
          .then(res => {
            console.log('successfully fetched new token');
            res.data &&
              window.localStorage.setItem('access_token', res.data.token);
            res.data &&
              window.localStorage.setItem(
                'refresh_token',
                res.data.refresh_token
              );
          })
          .catch(err => {
            const error = new Error('Relogin required');
            error.name = 'RELOGIN_REQUIRED';
            return Promise.reject(error);
          });
        return result;
      } else {
        return Promise.reject(err);
      }
    }
  );

  return instance;
}

const fetcher = async (url: string) =>
  useAuthorize()
    .get(url)
    .then(res => {
      console.log(res);
      return Promise.resolve(res.data);
    })
    .catch(err => {
      console.log(err);
      return Promise.reject(err);
    });

function logout() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}

export { useAuthorize, logout, fetcher };
