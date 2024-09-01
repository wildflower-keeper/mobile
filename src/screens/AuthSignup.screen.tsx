import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {colors} from '@/constants';
import CustomText from '@/components/base/CustomText';
import InputField from '@/components/InputField';
import CustomButton from '@/components/base/CustomButton';
import SelectField from '@/components/SelectField';
import ConsentField from '@/components/ConsentField';
import {backendAxiosInstance} from '@/utils/api/api';
import {setToken} from '@/utils/tokenStorage/tokenStorage';
import Toast from 'react-native-toast-message';
import {getDeviceUniqueId} from '@/utils/api/auth';
import useLoggedInStore from '@/stores/useLoggedIn';

interface AuthSignupProps {}

type termsIdsToAgreeType = {
  id: number;
  title: string;
  detail: string;
  isEssential: boolean;
};

type signupValueType = {
  name: string;
  shelterId: number;
  shelterPin: string;
  deviceId: string;
  room?: string;
  termsIdsToAgree?: number[];
  birthDate?: string;
  phoneNumber?: string;
  admissionDate?: string;
};

const AuthSignup = ({}: AuthSignupProps) => {
  const [signupValues, setSignupValues] = useState<signupValueType>({
    name: '',
    shelterId: 0,
    shelterPin: '',
    deviceId: '',
    room: '',
    termsIdsToAgree: [],
    birthDate: '1970-05-15',
    phoneNumber: '01011111111',
    admissionDate: '2024-08-01',
  });
  console.log(signupValues);
  const {setIsLoggedIn} = useLoggedInStore();
  useEffect(() => {
    getDeviceUniqueId().then((result: string) => {
      setSignupValues({...signupValues, deviceId: result});
    });
  }, []);
  const handleChangeText = (name: string, text: string) => {
    setSignupValues({...signupValues, [name]: text});
  };
  const handleChangeSelect = (value: number) => {
    setSignupValues({...signupValues, shelterId: value});
  };

  const [checkList, setCheckList] = useState({
    one: false,
    two: false,
  });

  const checkListHandler = (id: string, value: boolean) => {
    setCheckList({...checkList, [id]: value});
  };

  const handleSubmit = async () => {
    try {
      const res = await backendAxiosInstance({
        method: 'POST',
        headers: {'content-type': 'application/json', accept: '*/*'},
        url: '/api/v1/homeless-app/homeless',
        data: JSON.stringify(signupValues),
      });
      const result = await res.data;
      console.log(res);
      setToken(signupValues.deviceId, result.accessToken);
      setIsLoggedIn(true);
      Toast.show({
        type: 'success',
        text1: '회원가입이 정상적으로 완료되었습니다.',
        position: 'bottom',
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signupContainer}>
        <CustomText size="large">회원가입</CustomText>
      </View>
      <View style={styles.inputWrapper}>
        <InputField
          labelName="성함"
          placeholder="성함을 입력해주세요"
          isRequired
          value={signupValues.name}
          onChangeText={text => handleChangeText('name', text)}
        />
        <SelectField
          isRequired
          labelName="센터명"
          handleChange={handleChangeSelect}
        />
        <InputField
          labelName="핀번호"
          placeholder="관리자에게 안내받은 숫자를 입력해주세요."
          isRequired
          isPinNumber
          secureTextEntry
          value={signupValues.shelterPin}
          onChangeText={text => handleChangeText('shelterPin', text)}
        />
        <InputField
          labelName="호실"
          placeholder="이용하시는 호실을 입력해주세요"
          value={signupValues.room}
          onChangeText={text => handleChangeText('room', text)}
        />
        <ConsentField
          label="이용약관 동의"
          check={checkList.one}
          onChange={checkListHandler}
          id="one"
        />
        <ConsentField
          label="개인정보 수집 및 이용동의"
          check={checkList.two}
          onChange={checkListHandler}
          id="two"
        />
      </View>

      <CustomButton label="완료" variant="filled" onPress={handleSubmit} />
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
