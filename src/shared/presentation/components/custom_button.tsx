import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from '../../../core/styles/app_colors';

interface ICustomButton {
  title: string,
  icon?: JSX.Element,
  height: number,
  width: number,
  mode?: 'outlined' | 'contained' | 'text'
  onPress: () => void
}
const CustomButton = ({ title, icon, height, width, mode = 'contained', onPress }: ICustomButton) => {
  const borderRadius = height / 2;

  return (
    <TouchableOpacity onPress={onPress} style={[mode === 'contained' ? styles.containedButton : mode === 'outlined' ? styles.outlinedButton : styles.textButton, { width, height, borderRadius }]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={mode === 'contained' ? styles.containedButtonText : mode === 'outlined' ? styles.outlinedButtonText : styles.textButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containedButton: {
    backgroundColor: Colors.greenColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  containedButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    borderColor: Colors.greenColor,
    borderWidth: 1
  },
  outlinedButtonText: {
    color: Colors.greenColor,
    fontSize: 16,
    fontWeight: '400',
  },
  textButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  textButtonText: {
    color: Colors.greenColor,
    fontSize: 16,
    fontWeight: '400',
  },
  icon: {
    marginRight: 7,
    marginBottom: 5,
    marginLeft: 7
  },
});

export default CustomButton;
