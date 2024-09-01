import {colors} from '@/constants';
import useOvernightRequestStore from '@/stores/useOverNight';
import React from 'react';
import {KeyboardAvoidingView, Pressable, StyleSheet, View} from 'react-native';
import InputField from '../InputField';
import CustomText from '../base/CustomText';

interface ReasonSelectorContainerProps {}
const buttonTextList = ['가족', '모임', '일', '운동', '기타'];

const ReasonSelectorContainer = ({}: ReasonSelectorContainerProps) => {
  const {overnightRequestValues, setOvernightRequestValues} =
    useOvernightRequestStore();

  const selectReasonHandler = (value: string) => {
    /**
     * @param {string} value
     *
     * 외출 사유를 핸들링하는 함수.
     */
    setOvernightRequestValues({
      ...overnightRequestValues,
      reason: value,
    });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <View style={styles.optionContainer}>
        {buttonTextList.map(text => {
          return (
            <Pressable
              key={text}
              style={[
                styles.optionItem,
                text === overnightRequestValues.reason
                  ? styles.selectPress
                  : styles.defaultPress,
              ]}
              onPress={() => selectReasonHandler(text)}>
              <CustomText
                textColor={
                  text === overnightRequestValues.reason ? 'white' : 'default'
                }>
                {text}
              </CustomText>
            </Pressable>
          );
        })}
      </View>
      <View style={{width: '100%', flex: 0, gap: 30}}>
        <InputField labelName="기타" placeholder="사유를 입력해주세요." />
        <InputField
          labelName="비상연락망"
          placeholder="비상시 연락할 전화번호를 입력해주세요."
          value={overnightRequestValues.emergencyContact}
          onChangeText={text => {
            setOvernightRequestValues({
              ...overnightRequestValues,
              emergencyContact: text,
            });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 60, gap: 60},
  optionContainer: {
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: 30,
  },
  optionItem: {
    width: '30%',
    borderRadius: 24,
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 8,
  },
  defaultPress: {
    borderColor: colors.BORDER_COLOR,
  },
  selectPress: {
    backgroundColor: colors.PRIMARY,
    borderColor: colors.WHITE,
  },
});

export default ReasonSelectorContainer;
