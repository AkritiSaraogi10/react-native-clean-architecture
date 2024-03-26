import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../../core/styles/app_colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface dropdownInput {
    dropDownList: { label: string, value: string | number }[];
    value: string;
    onChange: (value: any) => void;
}

export const CustomDropDown = ({
    dropDownList,
    value,
    onChange,
}: dropdownInput) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, { color: isFocus ? Colors.greenColor : Colors.black }]}>
                    Label
                </Text>
            );
        }
        return null;
    };
    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                placeholder={!showDropDown ? 'Location' : '...'}
                value={value}
                data={dropDownList}
                labelField="label"
                valueField="value"
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.itemContainerStyle}
                selectedTextStyle={
                    styles.selectedTextStyle
                }
                renderRightIcon={() => (
                    <AntDesign
                        name={showDropDown ? "caretdown" : "caretup"}
                        size={12}
                    />
                )}
                style={[styles.dropdown, {
                    borderColor: isFocus ? Colors.greenColor : Colors.inactiveBorderColor,
                    borderWidth: isFocus ? 2 : 1
                }]}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    itemContainerStyle: {
        borderRadius: 12
    },
    itemTextStyle: {
        color: Colors.black,
        fontWeight: '700',
        fontSize: 14
    },
    container: {
        backgroundColor: 'white',
        padding: 10,
    },
    dropdown: {
        height: 60,
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: '700',
        paddingLeft: 10,
        color: Colors.black,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 18,
        top: 2,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontWeight: '700'
    },

});