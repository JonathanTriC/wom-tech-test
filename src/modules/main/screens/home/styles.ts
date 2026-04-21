import { ThemeType } from '@theme';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: theme.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.neutral.disabled,
    },
    headerLeft: {
      flex: 1,
      gap: 2,
    },

    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
      paddingHorizontal: 24,
    },
    listContent: {
      paddingVertical: 8,
    },
  });
