import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../../core/styles/app_colors';

interface btnProp {
  buttonColor?: string;
  buttonTextColor?: string;
  onPressMethod: () => void;
  text: string;
  mode: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
  icon: string;
}

export const CustomButton = ({
  buttonColor = Colors.greenColor,
  buttonTextColor = Colors.black,
  onPressMethod,
  text,
  mode,
  icon,
}: btnProp) => {
  const handleOnPress = () => {
    onPressMethod();
  };

  return (
    <Button
      buttonColor={mode === 'text' ? '' : buttonColor}
      textColor={buttonTextColor}
      mode={mode}
      style={styles.btn}
      icon={icon}
      onPress={handleOnPress}>
      {text}
    </Button>
  );
};
const styles = StyleSheet.create({
  btn: {
    width: '100%',
  },
});
