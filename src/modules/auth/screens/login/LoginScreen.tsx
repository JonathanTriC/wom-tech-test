import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Button, Text, TextField } from '@components';
import { createStyles } from './styles';
import { useLogin } from './useLogin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const LoginScreen: React.FC = () => {
  const {
    theme,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    apiError,
  } = useLogin();
  const styles = createStyles(theme);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.inner}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text
          text="Sign in to your account"
          type="regular-base"
          color="neutral.secondary"
        />
      </View>

      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              editable={!isLoading}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              secure
              label="Password"
              placeholder="Enter your password"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              editable={!isLoading}
              errorMessage={errors.password?.message}
            />
          )}
        />

        {apiError ? (
          <Text
            type="regular-sm"
            color="danger.base"
            text={apiError}
            textAlign="center"
          />
        ) : null}

        <Button action={handleSubmit(onSubmit)} isDisabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={theme.white} />
          ) : (
            <Text text="Login" type="bold-base" color="white" />
          )}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};
