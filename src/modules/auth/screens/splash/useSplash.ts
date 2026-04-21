import { useEffect } from 'react';
import { useAuth, useNavigate, useTheme } from '@hooks';

export const useSplash = () => {
  const { theme } = useTheme();
  const { getValidToken } = useAuth();
  const { resetNavigate } = useNavigate();

  useEffect(() => {
    const checkToken = async (): Promise<void> => {
      const payload = await getValidToken();

      if (payload) {
        resetNavigate('Main', { screen: 'HomeScreen' });
      } else {
        resetNavigate('Auth', { screen: 'LoginScreen' });
      }
    };

    checkToken();
  }, [getValidToken, resetNavigate]);

  return { theme };
};
