import { apiAuth } from './config.ts';

export const fetchLogin = async (email: string, password: string) => {
  const response = await apiAuth.post('', {
    email,
    password,
  });
  return response.data;
};
