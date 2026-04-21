import { StyleSheet } from 'react-native';
import type { ThemeType } from '@hooks';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inner: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    formContainer: {
      gap: 16,
    },
  });
