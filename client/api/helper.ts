import { parseCookies } from 'nookies';

export const getAuthHeaders = () => {
  const { accessToken } = parseCookies();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
};
