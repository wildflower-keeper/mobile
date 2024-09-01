import React, {useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {colors} from '@/constants';
import CustomText from './base/CustomText';
import PinComment from './PinComment';
import DropShadow from 'react-native-drop-shadow';

type InputFieldProps = {
  labelName: string;
  isRequired?: boolean;
  isPinNumber?: boolean;
  border?: boolean;
} & TextInputProps;

const InputField = ({
  labelName,
  isRequired = false,
  isPinNumber = false,
  border = false,
  ...props
}: InputFieldProps) => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <Pressable
      onPress={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}>
      <View style={[styles.container, border && styles.containerBorder]}>
        <View style={styles.labelWrapper}>
          {isRequired && <Text style={styles.requiredDot}>•</Text>}
          <CustomText>{labelName}</CustomText>
          {isRequired && (
            <CustomText style={styles.requiredText}>(필수)</CustomText>
          )}
        </View>
        {isPinNumber && <PinComment />}
        <DropShadow>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={inputRef}
              placeholderTextColor={colors.FONT_WEAK}
              style={styles.input}
              {...props}
            />
          </View>
        </DropShadow>
      </View>
    </Pressable>
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
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 6,
    width: '100%',
  },
  inputWrapper: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.BORDER_PRIMARY,
  },
  labelWrapper: {
    position: 'relative',
    flex: 0,
    flexDirection: 'row',
  },
  requiredDot: {
    position: 'absolute',
    color: colors.PRIMARY,
    left: -12,
    top: -20,
    fontSize: 32,
  },
  requiredText: {
    color: colors.PRIMARY,
    fontSize: 18,
  },
});

export default InputField;
