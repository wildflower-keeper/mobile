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
import {GET, POST} from '@/utils/api/api';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuthStore} from '@/providers/AuthProvider';
import {SignUpResponse} from '@/types/ApiResponse';
import useMessageService from '@/hooks/useMessageService';

interface AuthSignupProps {}

type TermsIdsToAgreeType = {
  id: number;
  title: string;
  detail: string;
  isEssential: boolean;
};

interface TermsType extends TermsIdsToAgreeType {
  id: number;
  agree: boolean;
}

type signupValueType = {
  name: string;
  shelterId: number;
  shelterPin: string;
  deviceId: string;
  room: string;
  termsIdsToAgree: number[];
  birthDate?: string | null;
  phoneNumber?: string;
  admissionDate?: string | null;
};

const AuthSignup = ({}: AuthSignupProps) => {
  const {deviceId} = useMessageService();
  const {setToken} = useAuthStore();
  const [signupValues, setSignupValues] = useState<signupValueType>({
    name: '',
    shelterId: 0,
    shelterPin: '',
    deviceId,
    room: '',
    termsIdsToAgree: [],
    birthDate: null,
    phoneNumber: '',
    admissionDate: null,
  });
  const [termsList, setTermsList] = useState<TermsType[]>([]);

  const submitActive =
    signupValues.name &&
    signupValues.shelterPin &&
    signupValues.shelterId !== 0 &&
    /^[가-힣a-zA-Z0-9\s]+$/.test(signupValues.room) &&
    signupValues.termsIdsToAgree.length === termsList.length;

  const handleChangeText = (name: string, text: string) => {
    setSignupValues({...signupValues, [name]: text});
  };

  const handleNumericText = (name: string, text: string) => {
    if (isNaN(Number(text))) {
      return;
    }
    const newValue = text.replace('.', '').trim();
    setSignupValues({...signupValues, [name]: newValue});
  };

  const handleChangeSelect = (value: number) => {
    setSignupValues({...signupValues, shelterId: value});
  };

  const getTerms = async () => {
    try {
      const res = await GET<TermsIdsToAgreeType[]>(
        '/api/v1/homeless-app/terms',
      );
      return res.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error) {
          Toast.show({
            text1: '서버 에러',
            type: 'error',
            text2: error.message,
            text2Style: {fontSize: 10},
            position: 'bottom',
          });
        }
      }
    }
  };
  useEffect(() => {
    getTerms().then(terms => {
      if (terms) {
        setTermsList(terms.map(term => ({...term, agree: false})));
      }
    });
  }, []);

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
    const updatedTermsList = termsList.map(term => ({...term, agree: true}));
    setTermsList(updatedTermsList);
  };

  useEffect(() => {
    updateTermsIdsAgree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termsList]);

  const handleSubmit = async () => {
    try {
      const {data: result} = await POST<SignUpResponse>(
        '/api/v1/homeless-app/homeless',
        {
          body: JSON.stringify(signupValues),
        },
      );
      if (!result) {
        throw Error('response is empty');
      }
      if ('errorCode' in result) {
        throw Error(result.description);
      }
      await setToken(result.accessToken);
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
            keyboardType="numeric"
            value={signupValues.shelterPin}
            onChangeText={text => handleNumericText('shelterPin', text)}
          />
          <InputField
            labelName="호실"
            placeholder="이용하시는 호실을 입력해주세요"
            isRequired
            value={signupValues.room}
            onChangeText={text => handleChangeText('room', text)}
          />
          <InputField
            labelName="전화번호"
            placeholder="전화번호를 입력해주세요"
            keyboardType="numeric"
            value={signupValues.phoneNumber}
            onChangeText={text => handleNumericText('phoneNumber', text)}
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
            {termsList.map(({id, title, detail, agree}) => {
              return (
                <ConsentField
                  key={id}
                  label={title}
                  isRequired
                  isArrow={false}
                  check={agree}
                  onChange={termsListHandler}
                  id={String(id)}
                  url={detail}
                />
              );
            })}
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
