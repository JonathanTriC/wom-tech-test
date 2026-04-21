import React from 'react';
import { Text } from '@components';
import { View } from 'react-native';
import { useSplash } from './useSplash';
import { createStyles } from './styles';

export const SplashScreen: React.FC = () => {
  const { theme } = useSplash();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text text="WOMTechTest" type="bold-2xl" color="neutral.base" />
    </View>
  );
};
