import React, {useState, useRef} from 'react';
import {Linking, Text, Pressable, StyleSheet, View, Animated} from 'react-native';
import CustomText from '../components/base/CustomText';
import emergencyCall from '@/utils/api/emergency';

const colors = ['#FF3D00', '#FF5A26', '#FF8C68'];

interface EmergencyButtonProps {
  shelterPhoneNumber: number;
}

const EmergencyButton = ({shelterPhoneNumber} : EmergencyButtonProps) => {
  const [colorIndex, setColorIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    let elapsed = 0;

    timerRef.current = setInterval(() => {
      elapsed++;
      setColorIndex((prevIndex) => ((prevIndex + 1) % colors.length));

      if(elapsed === 3) {
        console.log('버튼 동작 완료!');
        clearInterval(timerRef.current);
//       emergencyCall();
//       Linking.openURL(`tel:${shelterPhoneNumber}`);
      }
    }, 1000);
  };
  const handlePressOut = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setColorIndex(0);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.emergencyButton,
        { backgroundColor: colors[colorIndex] }
      ]}>
      <CustomText weight="heavy" textColor="white">
        긴급 도움
      </CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  emergencyButton: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FF3D00',
    backgroundColor: '#FF3D00'
  }
});

export default EmergencyButton;