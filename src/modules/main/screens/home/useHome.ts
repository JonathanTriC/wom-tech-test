import { useAuth, useNavigate } from '@hooks';

export const useHome = () => {
  const { logout } = useAuth();
  const { resetNavigate } = useNavigate();

  const onLogout = async (): Promise<void> => {
    await logout();
    resetNavigate('Auth', { screen: 'LoginScreen' });
  };

  return { onLogout };
};
