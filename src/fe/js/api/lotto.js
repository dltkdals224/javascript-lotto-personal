import { client } from './client';

export const getLottoInfo = async () => {
  return client.get('/lottoNumber');
};
