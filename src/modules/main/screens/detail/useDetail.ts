import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useTheme } from '@hooks';
import { apiGetWithoutToken } from '@api';

export const useDetail = () => {
  const { theme } = useTheme();
  const { getRouteParams } = useNavigate();
  const { data } = getRouteParams<DetailScreenParams>();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async (): Promise<void> => {
    if (!data?.id) {
      setError('Post not found.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await apiGetWithoutToken<Post>({
        url: `/${data.id}`,
      });
      setPost(result ?? null);
    } catch {
      setError('Failed to load post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [data?.id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    theme,
    post,
    isLoading,
    error,
    retry: fetchDetail,
  };
};
