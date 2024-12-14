import React, {PropsWithChildren} from 'react';
import {Modal, View, TouchableOpacity, StyleSheet} from 'react-native';
import CustomText from './CustomText';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
} & PropsWithChildren;

const CustomModal = ({visible, onClose, children}: CustomModalProps) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <CustomText style={styles.textStyle}>확인</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: '85%',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 20,
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
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 28,
    backgroundColor: '#00BF40',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomModal;
