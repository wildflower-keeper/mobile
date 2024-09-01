import React from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import CustomText from './base/CustomText';
import {formatSimpleDate} from '@/utils/date/date';
import {colors} from '@/constants';

interface ModalContainerProps {}

const ModalContainer = ({}: ModalContainerProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onPressModalOpen = () => {
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <View style={{marginTop: 500}}>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTextStyle}>
              <CustomText weight="heavy">
                {formatSimpleDate(
                  new Date(userInfo.upcomingSleepover.startDate),
                )}
                ~
                {formatSimpleDate(new Date(userInfo.upcomingSleepover.endDate))}
              </CustomText>
              <CustomText weight="heavy">일정을 취소하시겠습니까?</CustomText>
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
  );
};

const styles = StyleSheet.create({
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

export default ModalContainer;
