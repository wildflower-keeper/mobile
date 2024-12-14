import CustomModal from '@/components/base/CustomModal';
import CustomText from '@/components/base/CustomText';
import {HomeStackParamList} from '@/types/Stack';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

const Waiting = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    // tab navigator로 접근할 때마다 모달 띄워줘야 함
    setVisible(isFocused);
  }, [isFocused]);

  const hideModal = () => {
    setVisible(false);

    navigation.navigate('홈');
  };

  return (
    <View style={styles.container}>
      <CustomModal visible={visible} onClose={hideModal}>
        <CustomText style={styles.modalTitle}>준비 중입니다</CustomText>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#171719',
    marginBottom: 24,
  },
  // description: {
  //   flex: 1,
  //   fontSize: 18,
  //   width: 50,
  //   height: 50,
  // },
});

export default Waiting;
