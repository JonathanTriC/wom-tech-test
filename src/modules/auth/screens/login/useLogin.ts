import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth, useNavigate, useTheme } from '@hooks';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type FormData = yup.InferType<typeof schema>;

export const useLogin = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { resetNavigate } = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> => {
    console.log('🚀 ~ onSubmit ~ data:', { email, password });
    setIsLoading(true);
    setApiError(null);

    try {
      const res = await login(email, password);
      console.log('🚀 ~ onSubmit ~ res:', res);

      resetNavigate('Main', { screen: 'HomeScreen' });
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    theme,
    control,
    errors,
    isLoading,
    apiError,
    handleSubmit,
    onSubmit,
  };
};
