import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
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
import {ScrollView} from 'react-native-gesture-handler';

interface AuthSignupProps {}

type termsIdsToAgreeType = {
  id: number;
  title: string;
  detail: string;
  isEssential: boolean;
};

interface TermsType {
  id: number;
  agree: boolean;
}

type signupValueType = {
  name: string;
  shelterId: number;
  shelterPin: string;
  deviceId: string;
  room?: string;
  termsIdsToAgree: number[];
  birthDate?: string | null;
  phoneNumber?: string;
  admissionDate?: string | null;
};

const AuthSignup = ({}: AuthSignupProps) => {
  const [signupValues, setSignupValues] = useState<signupValueType>({
    name: '',
    shelterId: 0,
    shelterPin: '',
    deviceId: '',
    room: '',
    termsIdsToAgree: [],
    birthDate: null,
    phoneNumber: '',
    admissionDate: null,
  });
  const submitActive =
    signupValues.name &&
    signupValues.shelterPin &&
    signupValues.shelterId !== 0 &&
    signupValues.termsIdsToAgree.length === 4;
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

  const [termsList, setTermsList] = useState<TermsType[]>([
    {id: 1, agree: false},
    {id: 2, agree: false},
    {id: 3, agree: false},
    {id: 4, agree: false},
  ]);
  const termsListHandler = (id: string, value: boolean) => {
    const numberId = parseInt(id, 10);
    const updatedTermsList = termsList.map(term =>
      term.id === numberId ? {...term, agree: value} : term,
    );
    setTermsList(updatedTermsList);
  };

  const updateTermsIdsAgree = () => {
    const updatedTermsIdsToAgree = termsList
      .filter(term => term.agree)
      .map(term => term.id);
    setSignupValues({...signupValues, termsIdsToAgree: updatedTermsIdsToAgree});
  };

  const updateAllTermsIdsAgree = () => {
    termsList.map(term => {
      const updatedTermsList = termsList.map(term => ({...term, agree: true}));
      setTermsList(updatedTermsList);
    });
  };

  useEffect(() => {
    updateTermsIdsAgree();
  }, [termsList]);

  const handleSubmit = async () => {
    try {
      const res = await backendAxiosInstance.post(
        '/api/v1/homeless-app/homeless',
        signupValues,
        {
          headers: {'content-type': 'application/json', accept: '*/*'},
        },
      );
      const result = await res.data;
      if (result.errorCode) {
        throw new Error(result.description);
      }
      setToken(signupValues.deviceId, result.accessToken);
      setIsLoggedIn(true);
      Toast.show({
        type: 'success',
        text1: '회원가입이 정상적으로 완료되었습니다.',
        position: 'bottom',
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error) {
          Toast.show({
            type: 'error',
            text1: '가입 오류',
            text2: error.message,
            text2Style: {fontSize: 10},
            position: 'bottom',
          });
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.inputWrapper} behavior="padding">
        <ScrollView>
          <View style={styles.signupContainer}>
            <CustomText size="large">회원가입</CustomText>
          </View>
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
          <InputField
            labelName="전화번호"
            placeholder="전화번호를 입력해주세요"
            value={signupValues.phoneNumber}
            onChangeText={text => handleChangeText('phoneNumber', text)}
          />
          <View style={styles.termsContainer}>
            <ConsentField
              label="전체 동의"
              isRequired={false}
              isArrow={false}
              onChange={updateAllTermsIdsAgree}
              check={termsList.every(term => term.agree)}
              id={'all'}
              size="large"
            />
            <ConsentField
              label="서비스 이용약관 동의"
              isRequired
              isArrow={false}
              check={termsList[0].agree}
              onChange={termsListHandler}
              id={String(termsList[0].id)}
            />
            <ConsentField
              label="개인정보 수집 및 이용동의"
              isRequired
              isArrow={false}
              check={termsList[1].agree}
              onChange={termsListHandler}
              id={String(termsList[1].id)}
            />
            <ConsentField
              label="개인정보 제3자 제공 동의"
              isRequired
              isArrow={false}
              check={termsList[2].agree}
              onChange={termsListHandler}
              id={String(termsList[2].id)}
            />
            <ConsentField
              label="위치정보 수집 및 이용에 대한 동의"
              isRequired
              isArrow={false}
              check={termsList[3].agree}
              onChange={termsListHandler}
              id={String(termsList[3].id)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              label="완료"
              variant="filled"
              onPress={handleSubmit}
              disabled={!submitActive}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  buttonContainer: {width: '100%', alignItems: 'center'},
  termsContainer: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default AuthSignup;
