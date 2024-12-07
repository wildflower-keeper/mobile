import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import useOvernightRequestStore from '@/stores/useOverNight';
import CalendarContainer from '@/components/CalendarContainer';
import ReasonSelectorContainer from '@/components/ReasonSelectorContainer';

interface OvernightRequestProps {}

const OvernightRequest = ({navigation}: OvernightRequestProps) => {
  const [isNext, setIsNext] = useState<boolean>(false);
  const {overnightRequestValues, setOvernightRequestValues} =
    useOvernightRequestStore();

  const handlePrev = () => {
    /**
     * 이전 버튼을 눌렀을 때, isNext가 true이면 state를 false로 변경하여 달력으로 이동하고,
     * isNext가 false이면 navigation으로 Home으로 이동하는 함수.
     */
    if (isNext) {
      setIsNext(false);
      return;
    }
    setOvernightRequestValues({
      startDate: '',
      endDate: '',
      reason: '',
      emergencyContact: '',
    });
    navigation.navigate('Home');
  };
  const handleNext = () => {
    /**
     * 다음 버튼을 눌렀을 때, isNext가 true이면 state를 FinalConfirmation으로 이동하고,
     * isNext가 false이면 true로 변경, 사유 작성으로 이동하는 함수.
     */
    if (isNext) {
      if (
        !overnightRequestValues.reason ||
        overnightRequestValues.emergencyContact.length < 9
      ) {
        Toast.show({
          type: 'error',
          text1: '잘못된 전화번호입니다.',
          position: 'bottom',
        });
        return;
      }
      navigation.navigate('FinalConfirmation');
    }

    if (overnightRequestValues.endDate) {
      setIsNext(true);
    } else {
      Toast.show({
        type: 'error',
        text1: '외출 날짜를 선택해주세요',
        position: 'bottom',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText size="large" weight="heavy">
          외박 신청기간
        </CustomText>
        <CustomText size="small" textColor="weak">{`${
          !isNext ? '외박을 신청하는 날짜를' : '아래의 신청 이유 중'
        } 선택해주세요.`}</CustomText>
      </View>
      {!isNext ? <CalendarContainer /> : <ReasonSelectorContainer />}
      <View style={styles.buttonContainer}>
        <CustomButton
          label="이전"
          variant="outlined"
          size="md"
          onPress={handlePrev}
        />
        <CustomButton label="계속" size="md" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 60,
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
});

export default OvernightRequest;
