import React from 'react';
import {View, StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ActivityIndicator style={styles.indicator} color="#19C23D" />
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
});

export default Loading;
