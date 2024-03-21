import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Colors from '../../../core/styles/app_colors';

interface dropdownInput {
  dropDownList: any[];
  value: string;
  onChange: (value: any) => void;
}

export const CustomDropDown = ({
  dropDownList,
  value,
  onChange,
}: dropdownInput) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <>
      <Dropdown
        placeholder={!showDropDown ? 'Location' : '...'}
        value={value}
        data={dropDownList}
        labelField="label"
        valueField="value"
        onFocus={() => setShowDropDown(true)}
        onChange={onChange}
        style={styles.dropdown}
      />
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: Colors.greyColor,
    borderBottomWidth: 0.5,
  },
});
