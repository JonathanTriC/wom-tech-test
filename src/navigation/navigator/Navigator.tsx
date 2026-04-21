import { createStackNavigator } from '@react-navigation/stack';
import { useNavigator } from './useNavigator';
import { AuthStack } from './stack';
import { ParamList } from './screen';

const Stack = createStackNavigator<ParamList>();
type NavigatorProps = {};

export const Navigator: React.FC<NavigatorProps> = () => {
  const { screenListeners } = useNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenListeners={screenListeners}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Auth'} component={AuthStack} />
    </Stack.Navigator>
  );
};
