import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '@/components/base/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '@/types/Stack';

type AuthHomeNavigationProp = StackNavigationProp<AuthParamList, 'AuthHome'>;

interface AuthHomeProps {
  navigation: AuthHomeNavigationProp;
}

const AuthHome = ({navigation}: AuthHomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/image/wildflower_logo.png')}
          style={styles.logoImage}
        />
        <Image
          source={require('@/assets/image/wildflower_title.png')}
          style={styles.titleImage}
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* <CustomButton
          label="로그인"
          size="lg"
          onPress={() => navigation.navigate('AuthLogin')}
        /> */}
        <CustomButton
          label="회원가입"
          size="lg"
          variant="outlined"
          onPress={() => navigation.navigate('AuthSignup')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 68,
  },

  imageContainer: {
    flex: 0,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 0,
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  logoImage: {
    width: 76,
    height: 76,
  },
  titleImage: {
    height: 38,
    width: 200,
  },
});

export default AuthHome;
