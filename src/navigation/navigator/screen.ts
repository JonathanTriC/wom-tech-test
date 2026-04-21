import { NavigatorScreenParams } from '@react-navigation/native';

export type ParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};
