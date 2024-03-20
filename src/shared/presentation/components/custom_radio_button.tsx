import React from 'react';
import { RadioButton } from 'react-native-paper';

interface CustomRadioButtonProps {
    checked: boolean;
    onCheckChange: (checked: boolean) => void;
    color: string;
    uncheckedColor: string
}

const CustomRadioButton = ({ checked, onCheckChange, color, uncheckedColor }: CustomRadioButtonProps) => {
    return (
        <RadioButton.Android
            value="true"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => onCheckChange(!checked)}
            color={color}
            uncheckedColor={uncheckedColor}
        />
    );
};

export default CustomRadioButton;
