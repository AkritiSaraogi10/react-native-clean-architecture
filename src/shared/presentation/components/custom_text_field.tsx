import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../../core/styles/app_colors";

interface ICustomTextFieldProps {
    label: string;
    placeholder: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    hidePassword?: boolean;
    onChangeText: (text: string) => void;
    text: string, 
    readOnly?: boolean
}

const Input = ({ label, placeholder, leftIcon, rightIcon, hidePassword, onChangeText, text, readOnly }: ICustomTextFieldProps) => {
    const [focus, setFocus] = useState(false);

    const handleBlur = () => {
        if (!text) {
            setFocus(false);
        }
    }
    return (
        <View>
            <View style={styles.labelContainer}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: focus ? Colors.greenColor : Colors.darkGray
                }}>{label}</Text>
            </View>
            <View style={[
                styles.inputContainer,
                {
                    borderColor: focus ? Colors.greenColor : Colors.inactiveBorderColor,
                    borderWidth: focus ? 2 : 1
                }
            ]}>
                {leftIcon}
                {/* <Icon name="user" color={Colors.black} size={18} style={{ alignSelf: 'center' }} /> */}
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={Colors.inactiveBorderColor}
                    style={styles.textInputStyle}
                    focusable
                    cursorColor={Colors.greenColor}
                    onFocus={() => setFocus(true)}
                    secureTextEntry={hidePassword}
                    onChangeText={onChangeText}
                    onBlur={handleBlur}
                    value={text}
                    readOnly={readOnly}
                />
                {rightIcon}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    labelContainer: {
        backgroundColor: "white",
        alignSelf: "flex-start",
        paddingHorizontal: 3,
        marginStart: 10,
        zIndex: 1,
        elevation: 1,
        shadowColor: "white",
        position: "absolute",
        top: -10,
    },
    inputContainer: {
        borderRadius: 4,
        zIndex: 0,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
    },
    textInputStyle: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
        padding: 10
    }
});

export default Input;