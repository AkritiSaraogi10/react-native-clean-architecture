import React from 'react';
import { Checkbox } from 'react-native-paper';
interface CustomCheckBoxProps {
    initialState?: boolean;
    onStateChange: (newState: boolean) => void;
    color: string;
}
const CustomCheckBox = ({ initialState = false, onStateChange, color }: CustomCheckBoxProps) => {
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
            uncheckedColor='#ABABAB'
        />
    );
};

export default CustomCheckBox;
