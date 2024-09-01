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
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.toastText}
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.WHITE,
  },
});

export default toastConfig;
