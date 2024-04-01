import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Checkbox, Icon} from 'react-native-paper';
import Colors from '../../../core/styles/app_colors';

interface ICustomAccordianProps {
  checked: boolean;
  visible: boolean;
  title: string;
  children: JSX.Element;
  handleClick: (type?: 'checkbox') => void;
}

const CustomAccordian = ({
  checked,
  children,
  handleClick,
  title,
  visible,
}: ICustomAccordianProps) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.checkboxStyle}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            color={Colors.greenColor}
            uncheckedColor={Colors.suvaGray}
            onPress={() => handleClick('checkbox')}
          />
        </View>
        <View style={styles.buttonStyle}>
          <View style={styles.innerButtonStyle}>
            <Icon
              size={24}
              source={'map-marker-outline'}
              color={Colors.lightGreenColor}
            />
            <Text style={styles.textStyle}>{title}</Text>
          </View>
          <TouchableOpacity onPress={() => handleClick()}>
            <Icon
              size={24}
              source={'chevron-down'}
              color={Colors.lightGreenColor}
            />
          </TouchableOpacity>
        </View>
      </View>
      {visible && <View>{children}</View>}
    </View>
  );
};

export default CustomAccordian;

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    borderRadius: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.smokeWhite,
  },
  innerContainer: {flexDirection: 'row', alignItems: 'center', gap: 8},
  checkboxStyle: {paddingLeft: 10},
  buttonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
  },
  innerButtonStyle: {flexDirection: 'row', alignItems: 'center', gap: 8},
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.darkGray,
    fontFamily: 'Uni Neue',
  },
});
