import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from './base/CustomText';
import CheckBox from '@react-native-community/checkbox';

interface ConsentFieldProps {
  label: string;
  isRequired?: boolean;
  isArrow?: boolean;
  check?: boolean;
  onChange: (id: string, value: boolean) => void;
  id: string;
  size?: 'temp' | 'xLarge' | 'large' | 'default' | 'small' | 'xSmall';
}

const ConsentField = ({
  label,
  isRequired = true,
  isArrow = true,
  check,
  onChange,
  id,
  size = 'small',
}: ConsentFieldProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.innerTextContainer}>
          {isRequired && (
            <CustomText size="small" isBadge>
              필수
            </CustomText>
          )}
          <CustomText size={size}>{label}</CustomText>
          <Pressable>{isArrow && <CustomText>{'>'}</CustomText>}</Pressable>
        </View>
        <CheckBox
          style={styles.checkbox}
          value={check}
          onValueChange={newValue => onChange(id, newValue)}
        />
      </View>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },

  innerTextContainer: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    padding: 10,
    transform: [{scale: 1.5}],
    borderRadius: 10,
  },
});

export default ConsentField;
