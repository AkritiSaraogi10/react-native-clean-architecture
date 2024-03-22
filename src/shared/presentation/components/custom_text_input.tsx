import React, {useState, FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import Colors from '../../../core/styles/app_colors';

interface CustomInputProps {
  placeholder: string;
  label: string;
  secureTextEntry: boolean;
  text: string;
  onChangeText: (text: string) => void;
  right: React.ReactNode;
  left: React.ReactNode;
  error?: boolean;
  error_msg?: string;
}

export const CustomInput = ({
  placeholder,
  label,
  secureTextEntry = false,
  text,
  onChangeText,
  right,
  left,
  error = false,
  error_msg,
}: CustomInputProps) => {
  return (
    <>
      <TextInput
        outlineColor={Colors.greenColor}
        activeOutlineColor={Colors.greenColor}
        mode="outlined"
        label={label}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={text}
        style={[styles.textInput]}
        secureTextEntry={secureTextEntry}
        right={right}
        left={left}
        error={error}
      />
      {error ? <Text>{error_msg}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginVertical: 10,
  },
});
