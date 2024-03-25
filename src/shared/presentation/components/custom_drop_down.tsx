import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../../core/styles/app_colors';

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
                <Text style={[styles.label, isFocus && { color: Colors.greenColor }]}>
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
                onBlur={() => setIsFocus(false)}
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.itemContainerStyle}
                selectedTextStyle={
                    styles.selectedTextStyle
                }
                style={[styles.dropdown, isFocus && { borderColor: Colors.greenColor }]}
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
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontWeight: '700',
        paddingLeft: 10
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 18,
        top: 2,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

});