import SleepoverScheduleContainer from '@/components/SleepoverScheduleContainer';
import CustomText from '@/components/base/CustomText';
import {colors} from '@/constants';
import useUserInfoStore from '@/stores/useUserInfo';
import {formatSimpleDate} from '@/utils/date/date';
import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface OvernightListProps {}

const OvernightList = ({}: OvernightListProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };
  const {userInfo} = useUserInfoStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <CustomText size="large" weight="heavy">
          {userInfo.shelterName}
        </CustomText>
        <CustomText size="small" textColor="weak">
          외박 예정일과 상관없이 센터를 이용할 수 있습니다.
        </CustomText>
      </View>
      <View style={styles.bodyContainer}>
        <View>
          <CustomText>가까운 외박일정</CustomText>
          <View style={styles.viewCard}>
            {userInfo.upcomingSleepover && (
              <SleepoverScheduleContainer
                upcomingSleepover={userInfo.upcomingSleepover}
                onPress={onPressModalOpen}
              />
            )}
          </View>
        </View>
      </View>

      {userInfo.upcomingSleepover && (
        <View style={{marginTop: 500}}>
          <Modal
            animationType="fade"
            visible={isModalVisible}
            transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalTextStyle}>
                  <CustomText weight="heavy">
                    {formatSimpleDate(
                      new Date(userInfo.upcomingSleepover.startDate),
                    )}
                    ~
                    {formatSimpleDate(
                      new Date(userInfo.upcomingSleepover.endDate),
                    )}
                  </CustomText>
                  <CustomText weight="heavy">
                    일정을 취소하시겠습니까?
                  </CustomText>
                </View>
                <View style={{flex: 0, flexDirection: 'row', width: '100%'}}>
                  <Pressable
                    onPress={onPressModalClose}
                    style={[styles.modalButton, {borderBottomLeftRadius: 20}]}>
                    <CustomText>아니오</CustomText>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.modalButton,
                      {
                        backgroundColor: colors.BRIGHT_PRIMARY,
                        borderBottomRightRadius: 20,
                      },
                    ]}>
                    <CustomText textColor="white">네</CustomText>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
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
  titleContainer: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomColor: colors.BRIGHT_PRIMARY,
    borderBottomWidth: 1,
    gap: 8,
  },
  bodyContainer: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 30,
  },
  viewCard: {
    height: 200,
  },
  modalView: {
    paddingTop: 40,
    marginTop: 230,
    marginHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    flex: 0,
    alignItems: 'center',
    marginBottom: 50,
  },
  modalButton: {
    borderColor: colors.FONT_DEFAULT,
    borderTopWidth: 1,
    width: '50%',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  centeredView: {
    flex: 1,
    alignContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

export default OvernightList;
