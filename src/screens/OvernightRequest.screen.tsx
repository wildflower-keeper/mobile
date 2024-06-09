import InputField from '@/components/InputField';
import CustomButton from '@/components/base/CustomButton';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import calendarLocationConfig from '@/config/calendarConfig';

interface OvernightRequestProps {}

const buttonTextList = ['가족', '모임', '일', '운동', '기타'];

LocaleConfig.locales.kr = calendarLocationConfig;
LocaleConfig.defaultLocale = 'kr';

const OvernightRequest = ({navigation}: OvernightRequestProps) => {
  const [isNext, setIsNext] = useState<boolean>(false);
  const [overnightValues, setOvernightValues] = useState({});

  const handlePrev = () => {
    if (isNext) {
      setIsNext(false);
      return;
    }
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 0, alignItems: 'center'}}>
        <CustomText size="xLarge">외박을 신청하는</CustomText>
        <CustomText size="xLarge">{`${
          !isNext ? '이유를' : '기간을'
        } 선택해주세요.`}</CustomText>
      </View>
      {!isNext ? (
        <>
          <View>
            <CustomText size="small" textColor="weak">
              아래의 이유 중 선택해주세요.
            </CustomText>
          </View>
          <View style={styles.optionContainer}>
            {buttonTextList.map(text => {
              return (
                <Pressable key={text} style={styles.optionItem}>
                  <CustomText>{text}</CustomText>
                </Pressable>
              );
            })}
          </View>
          <InputField
            labelName="기타 사유"
            placeholder="사유를 입력해주세요."
            border={false}
          />
        </>
      ) : (
        <View style={{width: '90%'}}>
          <Calendar markingType={'period'} />
        </View>
      )}
      <View style={styles.buttonContainer}>
        <CustomButton
          label="이전"
          variant="outlined"
          size="sm"
          onPress={handlePrev}
        />
        <CustomButton label="계속" size="sm" onPress={() => setIsNext(true)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 60,
    marginTop: 72,
    marginBottom: 80,
  },
  optionContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 30,
  },
  optionItem: {
    width: '30%',
    borderColor: colors.BORDER_COLOR,
    borderWidth: 4,
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    gap: 20,
    marginTop: 'auto',
  },
});

export default OvernightRequest;
