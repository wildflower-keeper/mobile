import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

type CustomTextProps = {
  textColor?: 'default' | 'weak' | 'white';
  size?: 'temp' | 'xLarge' | 'large' | 'default' | 'small';
  isBadge?: boolean;
} & TextProps;

const CustomText = ({
  textColor = 'default',
  size = 'default',
  isBadge = false,
  children,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      style={[
        styles.text,
        styles[`${textColor}Text`],
        styles[`${size}Size`],
        isBadge && styles.badge,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'semibold',
    fontFamily: 'Pretendard',
  },
  defaultText: {
    color: colors.FONT_DEFAULT,
  },
  weakText: {
    color: colors.FONT_WEAK,
  },
  whiteText: {
    color: colors.WHITE,
  },

  tempSize: {
    fontSize: 64,
  },
  xLargeSize: {
    fontSize: 26,
  },
  largeSize: {
    fontSize: 20,
  },
  defaultSize: {
    fontSize: 18,
  },
  smallSize: {
    fontSize: 16,
  },
  badge: {
    color: colors.PRIMARY,
  },
});

export default CustomText;
