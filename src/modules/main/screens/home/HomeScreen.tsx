/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { useHome } from './useHome';
import { createStyles } from './styles';
import { Button, SkeletonLoading, Text } from '@components';
import { screenWidth } from '@constants';
import { PostCard } from '@modules/main/components';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons/static';

type HomeScreenProps = StackScreenProps<MainStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const {
    theme,
    scheme,
    posts,
    isLoading,
    isRefreshing,
    error,
    userEmail,
    toggleTheme,
    fetchPosts,
    onPressPostItem,
    onRefresh,
    onLogout,
  } = useHome();
  const styles = createStyles(theme);

  const renderItem = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onPress={() => onPressPostItem({ item })}
      showChevron
    />
  );

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoading height={100} width={screenWidth} />;
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text text={error} type="bold-base" color="danger.base" />
          <View style={{ width: '100%' }}>
            <Button label="Try Again" action={fetchPosts} danger />
          </View>
        </View>
      );
    }

    if (posts.length === 0) {
      return (
        <View style={styles.centered}>
          <Text
            text="No posts available"
            type="bold-base"
            color="neutral.secondary"
          />
        </View>
      );
    }

    return (
      <FlatList<Post>
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary.base}
            colors={[theme.primary.base]}
          />
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text text="Hello," type="bold-lg" color="neutral.base" />
          {userEmail ? (
            <Text
              text={userEmail}
              type="regular-base"
              color="neutral.secondary"
            />
          ) : null}
        </View>

        <TouchableOpacity onPress={toggleTheme}>
          <MaterialDesignIcons
            name={scheme === 'light' ? 'weather-night' : 'white-balance-sunny'}
            size={30}
            color={theme.neutral.base}
          />
        </TouchableOpacity>
        <View style={{ width: '28%' }}>
          <Button label="Logout" action={onLogout} danger />
        </View>
      </View>

      {renderContent()}
    </View>
  );
};
