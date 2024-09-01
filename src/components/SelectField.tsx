import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from './base/CustomText';
import {colors} from '@/constants';
import {backendAxiosInstance} from '@/utils/api/api';

type SelectFieldProps = {
  isRequired?: boolean;
  labelName: string;
  handleChange: (value: number) => void;
};

const SelectField = ({
  isRequired = false,
  labelName,
  handleChange,
}: SelectFieldProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    {label: '서울특별시립비전트레이닝센터', value: '1'},
    {label: '다시서기종합지원센터', value: '2'},
    {label: '24시간게스트하우스', value: '3'},
  ]);

  useEffect(() => {
    const getShelters = async () => {
      try {
        const res = await backendAxiosInstance({
          method: 'GET',
          url: '/api/v1/shared/shelters',
        });
        const result = await res.data;
        setItems(
          result.map(shelter => {
            return {label: shelter.shelterName, value: shelter.shelterId};
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getShelters();
  }, []);
  useEffect(() => {
    if (value) {
      handleChange(parseInt(value, 10));
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        {isRequired && <Text style={styles.requiredDot}>•</Text>}
        <CustomText>{labelName}</CustomText>
        {isRequired && (
          <CustomText style={styles.requiredText}>(필수)</CustomText>
        )}
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
    flex: 0,
    flexDirection: 'row',
  },
  requiredDot: {
    position: 'absolute',
    color: colors.PRIMARY,
    left: -12,
    top: -20,
    fontSize: 32,
  },
  requiredText: {
    color: colors.PRIMARY,
    fontSize: 18,
  },
  borderClose: {
    borderWidth: 1,
    borderColor: colors.BORDER_PRIMARY,
    shadowColor: colors.SHADOW_PRIMARY,
    elevation: 1,
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
