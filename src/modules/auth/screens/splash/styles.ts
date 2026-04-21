import { StyleSheet } from 'react-native';
import type { ThemeType } from '@hooks';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },
  });
