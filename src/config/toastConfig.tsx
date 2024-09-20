import {colors} from '@/constants';
import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToastProps} from 'react-native-toast-message';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

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
});

export default toastConfig;
