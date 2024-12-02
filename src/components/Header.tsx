import React, {PropsWithChildren} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import CustomText from './base/CustomText';
import backIcon from '@/assets/icon/arrow_left.png';

type HeaderProps = {
  onClickBack: () => void;
} & PropsWithChildren;

const Header = ({children, onClickBack}: HeaderProps) => {
  return (
    <View style={styles.Header}>
      <View style={styles.backButtonContainer}>
        <Pressable onPress={onClickBack}>
          <Image source={backIcon} style={styles.backButton} />
        </Pressable>
      </View>
      <CustomText style={styles.headerText}>{children}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    flex: 0,
    flexDirection: 'row',
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E2',
  },
  backButtonContainer: {
    flex: 0,
    paddingLeft: 20,
    width: 60,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  headerText: {
    flex: 1,
    marginRight: 60, // = backButtonContainer.width
    textAlign: 'center',
    lineHeight: 28,
    fontSize: 20,
    fontWeight: '600',
    color: '#171719',
  },
});

export default Header;
