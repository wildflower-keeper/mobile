import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface AppProps {}

const App = ({}: AppProps) => {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>1</Text>
          <Button title="로그인" />
          <Button title="회원가입" />
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    color: 'black',
    fontSize: 24,
  },
});

export default App;
