interface HomeScreenParams {}
interface DetailScreenParams {
  data: Post;
}

type MainStackParamList = {
  HomeScreen: HomeScreenParams;
  DetailScreen: HomeScreenParams;
};
