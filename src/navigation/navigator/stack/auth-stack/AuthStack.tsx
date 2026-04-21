import { createStackNavigator } from '@react-navigation/stack';
import { useNavigator } from '@navigation/navigator';
import { LoginScreen } from '@modules';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator<AuthStackParamList>();
type AuthStackProps = {};

export const AuthStack: React.FC<AuthStackProps> = () => {
  const { screenListeners } = useNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenListeners={screenListeners}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
