import CustomText from '@/components/base/CustomText';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeStackParamList} from '@/navigations/HomeStackNavigator';
import useScan from '@/hooks/queries/useScan';

type navigationProps = NavigationProp<HomeStackParamList>;

const ScanResult = () => {
  const navigation = useNavigation<navigationProps>();
  const {locationStatus, isFetched} = useScan();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  useEffect(() => {
    if (isFetched) {
      setIsModalVisible(true); // QR 스캔 시 모달을 다시 띄움
    }
  }, [isFetched]);

  const handlePressConfirm = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      navigation.navigate('Home');
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ActivityIndicator style={styles.indicator} color="#19C23D" />
        <Modal transparent={true} animationType="fade" visible={isModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalTextContainer}>
                <CustomText style={styles.modalText}>
                  {locationStatus} 신청이 완료 되었습니다.
                </CustomText>
              </View>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.closeButton}
                  activeOpacity={0.6}
                  onPress={handlePressConfirm}>
                  <CustomText style={styles.buttonText}>확인</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    transform: [{scale: 4}],
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 화면을 어둡게 만드는 배경
  },
  modalContainer: {
    height: 180,
    width: 300,
    paddingVertical: 7,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTextContainer: {
    height: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
  modalButtonContainer: {
    width: '100%',
    padding: 16,
    height: 80,
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19C23D',
    height: 42,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScanResult;
