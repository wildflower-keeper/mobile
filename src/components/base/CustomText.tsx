import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';

type CustomTextProps = {
  textColor?: 'default' | 'weak' | 'white';
  size?: 'temp' | 'xLarge' | 'large' | 'default' | 'small' | 'xSmall';
  isBadge?: boolean;
  weight?: 'default' | 'heavy' | 'thin';
} & TextProps;

const CustomText = ({
  textColor = 'default',
  size = 'default',
  isBadge = false,
  weight = 'default',
  children,
  ...props
}: CustomTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.text,
        styles[`${textColor}Text`],
        styles[`${size}Size`],
        styles[`${weight}Weight`],
        isBadge && styles.badge,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
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
  defaultWeight: {
    fontWeight: '600',
  },
  heavyWeight: {
    fontWeight: '700',
  },
  thinWeight: {
    fontWeight: '500',
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
  xSmallSize: {
    fontSize: 14,
  },
  badge: {
    color: colors.PRIMARY,
  },
});

export default CustomText;
