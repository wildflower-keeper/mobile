import React, {useRef} from 'react';
import {StyleSheet, TextInput, View, TextInputProps, Text} from 'react-native';
import {colors} from '@/constants';
import CustomText from './base/CustomText';

type InputFieldProps = {
  labelName: string;
  isRequired?: boolean;
  border?: boolean;
} & TextInputProps;

const InputField = ({
  labelName,
  isRequired = false,
  border = true,
  ...props
}: InputFieldProps) => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View
      style={[styles.container, border && styles.containerBorder]}
      onTouchEnd={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}>
      <View style={styles.labelWrapper}>
        {isRequired && <Text style={styles.requiredDot}>•</Text>}
        <CustomText>{labelName}</CustomText>
      </View>
      <TextInput
        ref={inputRef}
        placeholderTextColor={colors.FONT_WEAK}
        style={styles.input}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 30,
    gap: 10,
  },
  containerBorder: {
    borderBottomColor: colors.BORDER_COLOR,
    borderBottomWidth: 4,
  },
  input: {
    fontSize: 18,
    padding: 0,
  },
  labelWrapper: {
    position: 'relative',
  },
  requiredDot: {
    position: 'absolute',
    color: colors.PRIMARY,
    left: -12,
    top: -20,
    fontSize: 32,
  },
});

export default InputField;
