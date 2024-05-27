import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface AuthSignupProps {}

const AuthSignup = ({}: AuthSignupProps) => {
  return (
    <SafeAreaView>
      <View>
        <Text>회원가입 화면</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthSignup;
