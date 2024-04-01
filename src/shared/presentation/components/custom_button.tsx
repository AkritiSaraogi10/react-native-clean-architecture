import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, DimensionValue, StyleProp, ViewStyle } from 'react-native';
import Colors from '../../../core/styles/app_colors';
 
interface ICustomButton {
    title: string,
    icon?: JSX.Element,
    height?: DimensionValue,
    width?: DimensionValue,
    mode?: 'outlined' | 'contained' | 'text'
    onPress: () => void;
    textStyle?: StyleProp<ViewStyle>
}
const CustomButton = ({title, icon, height, width = '90%', mode = 'contained', onPress, textStyle} : ICustomButton) => {
 
  return (
    <TouchableOpacity onPress={onPress} style={[mode === 'contained' ? styles.containedButton : mode === 'outlined' ? styles.outlinedButton : styles.textButton, { width, height }]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={textStyle ? textStyle : mode === 'contained' ? styles.containedButtonText : mode === 'outlined' ? styles.outlinedButtonText : styles.textButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  containedButton: {
    paddingVertical: 10,
    backgroundColor: Colors.greenColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 999,
  },
  containedButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
  },
  outlinedButton: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    borderColor: Colors.greenColor,
    borderWidth: 1,
    borderRadius: 999,
  },
  outlinedButtonText: {
    color: Colors.greenColor,
    fontSize: 16,
    fontWeight: '400',
  },
  textButton: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    borderRadius: 999,
  },
  textButtonText: {
    color: Colors.greenColor,
    fontSize: 16,
    fontWeight: '400',
  },
  icon: {
    marginRight: 7,
    marginLeft: 7
  },
});
 
export default CustomButton;