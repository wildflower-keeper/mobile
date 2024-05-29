import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {colors} from '@/constants';
import CustomText from '@/components/base/CustomText';
import InputField from '@/components/base/InputField';
import CustomButton from '@/components/base/CustomButton';
import SelectField from '@/components/base/SelectField';

interface AuthSignupProps {}

const AuthSignup = ({}: AuthSignupProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <CustomText size="large">회원가입</CustomText>
      </View>
      <View style={styles.inputWrapper}>
        <InputField
          labelName="성함"
          defaultValue="성함을 입력해주세요"
          isRequired
        />
        <SelectField isRequired labelName="센터명" />
        <InputField
          labelName="비밀번호"
          defaultValue="비밀번호를 입력해주세요"
          isRequired
        />
        <InputField
          labelName="호실"
          defaultValue="이용하시는 호실을 입력해주세요"
        />
      </View>

      <CustomButton label="완료" variant="filled" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    marginBottom: 40,
  },
  signupContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    borderBottomColor: colors.PRIMARY,
    borderBottomWidth: 2,
    width: '100%',
  },
  inputWrapper: {
    paddingVertical: 20,
    flex: 1,
    width: '100%',
    gap: 8,
  },
});

export default AuthSignup;
