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
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

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
  border = true,
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
        {isPinNumber && (
          <View style={styles.infoContainer}>
            <AntDesignIcons
              name="infocirlceo"
              size={16}
              color={colors.FONT_WEAK}
              style={{marginTop: 3}}
            />
            <View>
              <CustomText style={styles.infoText}>
                매일 바뀌는 보안숫자로, 센터에 입소하지 않은
              </CustomText>
              <CustomText style={styles.infoText}>
                사람은 회원가입 진행이 어렵습니다.
              </CustomText>
            </View>
          </View>
        )}
        <TextInput
          ref={inputRef}
          placeholderTextColor={colors.FONT_WEAK}
          style={styles.input}
          {...props}
        />
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
    borderBottomWidth: 4,
  },
  input: {
    fontSize: 18,
    padding: 0,
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
  infoContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 4,
  },
  infoText: {
    color: colors.FONT_WEAK,
    fontSize: 16,
  },
});

export default InputField;
