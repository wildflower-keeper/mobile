import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from './base/CustomText';
import CheckBox from '@react-native-community/checkbox';

interface ConsentFieldProps {
  label: string;
  isRequired?: boolean;
  isArrow?: boolean;
  check: boolean;
  onChange: (id: string, value: boolean) => void;
  id: string;
}

const ConsentField = ({
  label,
  isRequired = true,
  isArrow = true,
  check,
  onChange,
  id,
}: ConsentFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {isRequired && <CustomText isBadge>필수</CustomText>}
        <CustomText>{label}</CustomText>
        <Pressable>{isArrow && <CustomText>{'>'}</CustomText>}</Pressable>
      </View>
      <CheckBox
        style={styles.checkbox}
        value={check}
        onValueChange={newValue => onChange(id, newValue)}
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
