import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { Button, Text } from '@components';
import { useHome } from './useHome';

type HomeScreenProps = StackScreenProps<MainStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { onLogout } = useHome();

  return (
    <View style={styles.container}>
      <Text text="HomeScreen" type="bold-2xl" color="neutral.base" />
      <Button label="Logout" action={onLogout} danger style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  button: {
    paddingHorizontal: 40,
  },
});
