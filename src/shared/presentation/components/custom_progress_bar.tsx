import React from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Colors from '../../../core/styles/app_colors';

interface ICustomProgressBarProps {
  fillColor?: string;
  unFillColor?: string;
  progress: number;
  indeterminate?: boolean;
  arrayOfProgressObjects?: {progress: number; style: StyleProp<ViewStyle>}[];
}

const CustomProgressBar = ({
  fillColor,
  unFillColor,
  progress,
  indeterminate = false,
  arrayOfProgressObjects = [
    {progress, style: {backgroundColor: fillColor || Colors.midBlue}},
    {
      progress: 1 - progress,
      style: {backgroundColor: unFillColor || Colors.lightSmokeWhite},
    },
  ],
}: ICustomProgressBarProps) => {
  const getValue = (value: number): string => {
    value = Math.min(Math.max(value, 0), 1) * 100;
    return `${value}%`;
  };

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
    },
    progressBar: {
      flex: 1,
      flexDirection: 'row',
      marginRight: 10,
      width: '100%',
    },
    progressPercentage: {
      height: 4,
    },
    text: {
      fontSize: 12,
      width: 30,
    },
  });

  return indeterminate ? (
    <View>
      <ProgressBar indeterminate={indeterminate} color={fillColor} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {arrayOfProgressObjects.map((object, index) => (
          <View
            key={index}
            style={[
              styles.progressPercentage,
              {width: getValue(object.progress) as DimensionValue},
              object.style,
            ]}
          />
        ))}
      </View>
      <Text style={styles.text}>{`${(progress * 100).toFixed(0)} %`}</Text>
    </View>
  );
};

export default CustomProgressBar;
