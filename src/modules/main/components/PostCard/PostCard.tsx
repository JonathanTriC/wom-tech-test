import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@hooks';
import { createStyles } from './styles';
import { Text } from '@components';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

interface PostCardProps {
  post: Post;
  showChevron?: boolean;
  onPress?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPress,
  showChevron = false,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const content = (
    <View style={styles.row}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text text={`#${post.id}`} type="bold-sm" color="white" />
        </View>

        <Text
          text={post.title}
          type="bold-sm"
          color="neutral.base"
          numberOfLines={2}
          ellipsizeMode="tail"
        />
        <Text
          text={post.body}
          type="regular-base"
          color="neutral.secondary"
          numberOfLines={2}
          ellipsizeMode="tail"
        />
      </View>

      {showChevron && (
        <MaterialDesignIcons
          name="chevron-right"
          size={20}
          color={theme.neutral.secondary}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Post ${post.id}: ${post.title}`}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.card}>{content}</View>;
};
