import { StyleSheet } from 'react-native';
import { ThemeType } from '@theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.backdrop,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 16,
      marginVertical: 6,
      // iOS shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      // Android elevation
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      gap: 6,
    },
    badge: {
      alignSelf: 'flex-start',
      backgroundColor: theme.primary.base,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 2,
      marginBottom: 6,
    },
  });
