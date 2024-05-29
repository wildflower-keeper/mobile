import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CustomText from '../components/base/CustomText';

interface HomeProps {}

const Home = ({}: HomeProps) => {
  return (
    <SafeAreaView>
      <View>
        <CustomText>메인 페이지</CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Home;
