import InputField from '@/components/InputField';
import SelectField from '@/components/SelectField';
import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface AuthLoginProps {}

const AuthLogin = ({navigation}: AuthLoginProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <CustomText size="large">로그인</CustomText>
      </View>
      <View style={styles.inputWrapper}>
        <InputField
          labelName="성함"
          placeholder="성함을 입력해주세요"
          isRequired
        />
        <SelectField isRequired labelName="센터명" handleChange={() => {}} />
        <InputField
          labelName="핀번호"
          placeholder="안내된 숫자 4자리를 입력해주세요."
          isRequired
          secureTextEntry
        />
        <InputField
          labelName="전화번호"
          placeholder="전화번호를 입력해주세요"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton label="로그인" size="xl" />
        <CustomButton
          label="처음으로"
          variant="outlined"
          size="xl"
          onPress={() => navigation.navigate('AuthHome')}
        />
      </View>
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
  loginContainer: {
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
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    flex: 0,
    width: '90%',
    gap: 10,
    paddingVertical: 10,
  },
});

export default AuthLogin;
