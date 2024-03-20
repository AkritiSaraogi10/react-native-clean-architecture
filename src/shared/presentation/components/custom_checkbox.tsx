import React from 'react';
import { Checkbox } from 'react-native-paper';
import Colors from '../../../core/styles/app_colors';
interface ICustomCheckBoxProps {
    initialState?: boolean;
    onStateChange: (newState: boolean) => void;
    color: string;
    uncheckedColor?: string
}
const CustomCheckBox = ({
    initialState = false,
    onStateChange, color,
    uncheckedColor = Colors.greyColor
}:
    ICustomCheckBoxProps) => {
    const [checked, setChecked] = React.useState(initialState);

    const toggleCheckbox = () => {
        const newState = !checked;
        setChecked(newState);
        if (onStateChange) {
            onStateChange(newState);
        }
    };

    return (
        <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={toggleCheckbox}
            color={color}
            uncheckedColor={uncheckedColor}
        />
    );
};

export default CustomCheckBox;
