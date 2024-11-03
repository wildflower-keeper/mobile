import React from 'react';
import {
  // Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';
import {colors} from '@/constants';

type CustomButtonProps = {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'xl' | 'lg' | 'md' | 'sm';
  disabled?: boolean;
} & PressableProps;

// 추가로 디바이스 높이 별 반응형이 구현되어야 할 때 사용 할 예정.
// const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'lg',
  disabled = false,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
      ]}
      disabled={disabled}
      {...props}>
      <Text allowFontScaling={false}	 style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: colors.PRIMARY,
  },
  outlined: {
    borderColor: colors.PRIMARY,
    backgroundColor: colors.WHITE,
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: colors.FONT_WEAK,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: colors.PRIMARY,
  },
  xl: {
    width: '100%',
    paddingVertical: 12,
  },
  lg: {
    width: '70%',
    paddingVertical: 12,
  },
  md: {
    width: '48%',
    paddingVertical: 12,
  },
  sm: {
    width: '30%',
    paddingVertical: 12,
  },
});

export default CustomButton;
