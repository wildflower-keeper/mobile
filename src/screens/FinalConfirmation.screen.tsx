import ConsentField from '@/components/ConsentField';
import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import {useMutateCreateOvernight} from '@/hooks/queries/useMutateCreateOvernight';
import {HomeStackParamList} from '@/types/Stack';
import {useUserStore} from '@/providers/UserProvider';
import useOvernightRequestStore from '@/stores/useOverNight';
import {formatUpdateTime} from '@/utils/date/date';
import {NavigationProp} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';

interface FinalConfirmationProps {
  navigation: NavigationProp<HomeStackParamList>;
}

const FinalConfirmation = ({navigation}: FinalConfirmationProps) => {
  const queryClient = useQueryClient();
  const {user: userInfo} = useUserStore();
  const {overnightRequestValues, setOvernightRequestValues} =
    useOvernightRequestStore();
  const overnightPost = useMutateCreateOvernight();
  const [checkList, setCheckList] = useState({
    optionOne: false,
    optionTwo: false,
    optionThree: false,
  });
  const optionHandler = (id: string, value: boolean) => {
    setCheckList({...checkList, [id]: value});
  };

  const submitHandler = () => {
    overnightPost.mutate(
      {body: overnightRequestValues},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['userInfo']});
          queryClient.invalidateQueries({queryKey: ['sleepovers']});
          Toast.show({
            type: 'success',
            text1: '외박 신청이 완료되었습니다.',
            position: 'bottom',
          });
          setOvernightRequestValues({
            startDate: '',
            endDate: '',
            reason: '',
            emergencyContact: '',
          });
          navigation.navigate('Home');
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: error.message,
            position: 'bottom',
          });
        },
      },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText size="large" weight="heavy">
          외박신청 최종확인
        </CustomText>
        <CustomText size="small" textColor="weak">
          마지막으로 신청하신 정보의 확인이 필요합니다.
        </CustomText>
      </View>

      <View style={styles.bodyContainer}>
        <View>
          <CustomText>
            {userInfo.homelessName}님, 외박 일정이 있으시군요!
          </CustomText>
        </View>

        <View style={styles.confirmationContainer}>
          <CustomText size="large">외박하려는 날짜는</CustomText>
          <CustomText size="large" isBadge weight="heavy">
            {formatUpdateTime(new Date(overnightRequestValues.startDate))} ~
            {formatUpdateTime(new Date(overnightRequestValues.endDate))}
          </CustomText>
          <View style={styles.reasonContainer}>
            <CustomText size="large">이유는</CustomText>
            <CustomText size="large" isBadge weight="heavy">
              {overnightRequestValues.reason}
            </CustomText>
            <CustomText size="large">이 맞으신가요?</CustomText>
          </View>

          <View style={styles.adviceContainer}>
            <CustomText textColor="weak" size="small">
              아래의 내용에 동의하면 외박신청이 최종완료 됩니다.
            </CustomText>
          </View>
        </View>
        <View style={styles.checkListContainer}>
          <ConsentField
            label="외박일수에 맞춰 약을 챙겨주세요."
            isRequired={false}
            isArrow={false}
            check={checkList.optionOne}
            onChange={optionHandler}
            id="optionOne"
          />
          <ConsentField
            label="외박시 음주를 자제해주세요."
            isRequired={false}
            isArrow={false}
            check={checkList.optionTwo}
            onChange={optionHandler}
            id="optionTwo"
          />
          <ConsentField
            label="긴급도움 요청하기를 누르면 위치정보가 관계자에게 자동으로 전달됩니다."
            isRequired={false}
            isArrow={false}
            check={checkList.optionThree}
            onChange={optionHandler}
            id="optionThree"
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            label="이전"
            variant="outlined"
            size="md"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <CustomButton
            label="완료"
            size="md"
            onPress={submitHandler}
            disabled={
              !checkList.optionOne ||
              !checkList.optionTwo ||
              !checkList.optionThree
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: colors.BRIGHT_PRIMARY,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 6,
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  adviceContainer: {
    paddingTop: 40,
  },
  reasonContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 4,
  },
  checkListContainer: {
    paddingBottom: 30,
  },
});

export default FinalConfirmation;
