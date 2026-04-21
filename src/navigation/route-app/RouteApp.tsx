import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from './styles';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Navigator } from '@navigation/navigator';

export const RouteApp = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />

      <GestureHandlerRootView style={styles.flex1}>
        <NavigationContainer theme={MyTheme}>
          <Navigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
