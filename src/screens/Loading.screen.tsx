import CustomText from '@/components/base/CustomText';
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomText>'heelo'</CustomText>
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
});

export default Loading;
