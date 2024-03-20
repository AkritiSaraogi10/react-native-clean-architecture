import React from 'react';
import {DimensionValue, StyleSheet, Text, View} from 'react-native';
import {Svg, Circle, Text as SVGText} from 'react-native-svg';
import Colors from '../../../core/styles/app_colors';

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  text: string;
  progressPercent: number;
  bgColor?: string;
  pgColor?: string;
  textSize?: number;
  textColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const {size, strokeWidth, text} = props;
  const radius = (size - strokeWidth) / 2;
  const svgProgress = 100 - props.progressPercent;

  // For remaining progress circle
  // For progress circle
  const progressDasharray = radius * Math.PI * 2;
  const progressDashoffset = radius * Math.PI * 2 * (1 - (svgProgress - 0.6) / 100);

  // For remaining progress circle
  const remainingProgressDasharray = radius * Math.PI * 2;
  const remainingProgressDashoffset =
    radius * Math.PI * 2 * (1 - (props.progressPercent - 0.6) / 100);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: (size - 5 * strokeWidth) / 2,
    },
    text: {
      fontSize: 28,
      fontFamily: 'Uni Neue',
      color: Colors.black,
      fontWeight: '700',
    },
    subText: {
      fontSize: 14,
      fontWeight: '700',
    },
  });

  return (
    <View style={{margin: 10 as DimensionValue}}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={Colors.white}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{strokeWidth}}
        />

        <Circle
          stroke={props.bgColor ? props.bgColor : Colors.lightSmokeWhite}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={progressDasharray}
          strokeDashoffset={progressDashoffset}
          strokeLinecap="butt"
          transform={`rotate(${360 * (props.progressPercent / 100) - 90}, ${
            size / 2
          }, ${size / 2})`}
          {...{strokeWidth}}
        />

        <Circle
          stroke={props.pgColor ? props.pgColor : Colors.midBlue}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={remainingProgressDasharray}
          strokeDashoffset={remainingProgressDashoffset}
          strokeLinecap="butt"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{strokeWidth}}
        />

        {/* Text */}
        <SVGText
          fontSize={props.textSize ? props.textSize : '10'}
          x={size / 2}
          y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
          textAnchor="end"
          fill={props.textColor ? props.textColor : Colors.warmGray}>
          <View style={styles.container}>
            <Text style={styles.text}>{props.progressPercent}%</Text>
            <Text style={styles.subText}>{text}</Text>
          </View>
        </SVGText>
      </Svg>
    </View>
  );
};

export default CircularProgress;
