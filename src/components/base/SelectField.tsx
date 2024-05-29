import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from './CustomText';
import {colors} from '@/constants';

type SelectFieldProps = {
  isRequired?: boolean;
  labelName: string;
};

const SelectField = ({isRequired = false, labelName}: SelectFieldProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    {label: '서울특별시립비전트레이닝센터', value: '1'},
    {label: '다시서기종합지원센터', value: '2'},
    {label: '24시간게스트하우스', value: '3'},
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        {isRequired && <Text style={styles.requiredDot}>•</Text>}
        <CustomText>{labelName}</CustomText>
      </View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="센터를 선택해주세요"
        placeholderStyle={styles.placeholder}
        dropDownContainerStyle={[
          styles.borderClose,
          {backgroundColor: colors.WHITE},
        ]}
        textStyle={styles.dropdownText}
        style={styles.borderClose}
        tickIconContainerStyle={styles.tick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.BORDER_COLOR,
    borderBottomWidth: 4,
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 30,
    gap: 10,
    zIndex: 10,
  },
  tick: {
    color: colors.PRIMARY,
  },
  labelWrapper: {
    position: 'relative',
  },
  requiredDot: {
    position: 'absolute',
    color: colors.PRIMARY,
    left: -12,
    top: -20,
    fontSize: 32,
  },
  borderClose: {
    borderWidth: 0,
  },
  dropdownText: {
    color: colors.FONT_WEAK,
    fontSize: 18,
    fontWeight: 600,
  },
  placeholder: {
    color: colors.FONT_WEAK,
    fontSize: 18,
    fontWeight: 600,
  },
});

export default SelectField;
