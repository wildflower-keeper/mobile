import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <SafeAreaView>
      <View>
        <Text>홈 화면</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
