import { useCallback, useEffect, useState } from 'react';
import { useAuth, useNavigate, useTheme } from '@hooks';
import { apiGetWithoutToken } from '@api';
import { BASE_URL } from '@constants';

export const useHome = () => {
  const { theme, scheme, toggleTheme } = useTheme();
  const { logout, getValidToken } = useAuth();
  const { resetNavigate, navigateScreen } = useNavigate();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');

  const fetchPosts = useCallback(async (): Promise<void> => {
    try {
      const data = await apiGetWithoutToken<Post[]>({
        url: BASE_URL,
      });
      setPosts(data);
      setError(null);
    } catch {
      setError('Failed to load posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      await fetchPosts();
    } finally {
      setIsRefreshing(false);
    }
  };

  const onPressPostItem = ({ item }: { item: Post }) => {
    navigateScreen('Main', {
      screen: 'DetailScreen',
      params: {
        data: item,
      },
    });
  };

  const onLogout = async (): Promise<void> => {
    await logout();
    resetNavigate('Auth', { screen: 'LoginScreen' });
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const loadEmail = async (): Promise<void> => {
      const payload = await getValidToken();
      if (payload?.email) {
        setUserEmail(payload.email);
      }
    };

    loadEmail();
  }, [getValidToken]);

  return {
    theme,
    scheme,
    posts,
    isLoading,
    isRefreshing,
    error,
    userEmail,
    toggleTheme,
    fetchPosts,
    onPressPostItem,
    onRefresh,
    onLogout,
  };
};
