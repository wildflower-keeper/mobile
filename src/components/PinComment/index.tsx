import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import CustomText from '../base/CustomText';

interface PinCommentProps {}

const PinComment = ({}: PinCommentProps) => {
  return (
    <View style={styles.container}>
      <AntDesignIcons
        name="infocirlceo"
        size={16}
        color={colors.FONT_WEAK}
        style={styles.icon}
      />
      <View>
        <CustomText style={styles.text}>
          매일 바뀌는 보안숫자로, 센터에 입소하지 않은
        </CustomText>
        <CustomText style={styles.text}>
          사람은 회원가입 진행이 어렵습니다.
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    gap: 4,
  },
  icon: {
    marginTop: 3,
  },
  text: {
    color: colors.FONT_WEAK,
    fontSize: 16,
  },
});

export default PinComment;
