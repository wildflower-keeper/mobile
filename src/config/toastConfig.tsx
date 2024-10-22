import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {BaseToastProps} from 'react-native-toast-message';
import {BaseToast, ErrorToast} from 'react-native-toast-message';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.toastText}
      text1NumberOfLines={2}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.errorToastContainer}
      contentContainerStyle={styles.errorToastContentContainer}
      text1Style={styles.toastErrorText}
      text2NumberOfLines={3}
    />
  ),
  info: ({text1, props}) => (
    <View style={styles.infoToastContainer}>
      <AntDesignIcon name={props.icon} color="white" />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
    ),
};

const styles = StyleSheet.create({
  container: {
    borderLeftColor: 'rgba(0, 0, 0, 0.4)',
  },
  contentContainer: {
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  toastText: {
    fontFamily: 'Pretendard',
    fontSize: 16,
    fontWeight: '600',
    color: colors.WHITE,
  },
  errorToastContainer: {
    borderLeftColor: 'rgba(255, 0, 0, 0.692)',
    height: 100,
  },
  errorToastContentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.863)',
  },
  toastErrorText: {
    fontFamily: 'Pretendard',
    fontSize: 12,
    fontWeight: '600',
    color: '#000000',
  },
  infoToastContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 0,
    borderRadius: 8,
    backgroundColor: '#353535',
  }
});

export default toastConfig;
