import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from './base/CustomText';
import CheckBox from '@react-native-community/checkbox';

interface ConsentFieldProps {
  label: string;
}

const ConsentField = ({label}: ConsentFieldProps) => {
  const [check, setCheck] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <CustomText isBadge>필수</CustomText>
        <CustomText>{label}</CustomText>
        <Pressable>
          <CustomText>{'>'}</CustomText>
        </Pressable>
      </View>
      <CheckBox
        style={styles.checkbox}
        value={check}
        onValueChange={newValue => setCheck(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 30,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  innerContainer: {
    gap: 10,
    flex: 1,
    flexDirection: 'row',
  },
  checkbox: {
    padding: 10,
    transform: [{scale: 1.3}],
  },
});

export default ConsentField;
