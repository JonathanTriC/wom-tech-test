/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Button, SkeletonLoading, Text } from '@components';
import { PostCard } from '@modules/main/components';
import { useDetail } from './useDetail';
import { createStyles } from './styles';
import { screenWidth } from '@constants';

type DetailScreenProps = StackScreenProps<MainStackParamList, 'DetailScreen'>;

export const DetailScreen: React.FC<DetailScreenProps> = ({ navigation }) => {
  const { theme, post, isLoading, error, retry } = useDetail();
  const styles = createStyles(theme);

  const renderBody = () => {
    if (isLoading) {
      return <SkeletonLoading height={100} width={screenWidth} />;
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text text={error} type="bold-base" color="danger.base" />
          <View style={{ width: '100%' }}>
            <Button label="Try Again" action={retry} danger />
          </View>
        </View>
      );
    }

    if (!post) {
      return (
        <View style={styles.centered}>
          <Text
            text="Post Not Found"
            type="bold-base"
            color="neutral.secondary"
          />
        </View>
      );
    }

    // ── Content ──────────────────────────────────────────────────────────────
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PostCard post={post} showChevron={false} />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.pop()}>
          <MaterialDesignIcons
            name="chevron-left"
            size={30}
            color={theme.neutral.base}
          />
        </TouchableOpacity>

        <Text
          text="Detail Post"
          type="bold-lg"
          color="neutral.base"
          style={styles.headerTitle}
        />

        <View style={styles.headerSpacer} />
      </View>

      {renderBody()}
    </View>
  );
};
