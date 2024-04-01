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

const CircularProgress: React.FC<CircularProgressProps> = ({
  progressPercent,
  size,
  strokeWidth,
  text,
  bgColor,
  pgColor,
  textColor,
  textSize,
}) => {
  const radius = (size - strokeWidth) / 2;
  const svgProgress = 100 - progressPercent;
  const outerCircleRadius = size / 2;

  // For remaining progress circle
  // For progress circle
  const progressDashArray = radius * Math.PI * 2;
  const progressDashOffset =
    radius * Math.PI * 2 * (1 - (svgProgress - 0.6) / 100);

  // For remaining progress circle
  const remainingProgressDashArray = radius * Math.PI * 2;
  const remainingProgressDashOffset =
    radius * Math.PI * 2 * (1 - (progressPercent - 0.6) / 100);

  return (
    <View style={{margin: 10 as DimensionValue}}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={Colors.white}
          fill="none"
          cx={outerCircleRadius}
          cy={outerCircleRadius}
          r={radius}
          {...{strokeWidth}}
        />

        <Circle
          stroke={bgColor ? bgColor : Colors.lightSmokeWhite}
          fill="none"
          cx={outerCircleRadius}
          cy={outerCircleRadius}
          r={radius}
          strokeDasharray={progressDashArray}
          strokeDashoffset={progressDashOffset}
          strokeLinecap="butt"
          transform={`rotate(${
            360 * (progressPercent / 100) - 90
          }, ${outerCircleRadius}, ${outerCircleRadius})`}
          {...{strokeWidth}}
        />

        <Circle
          stroke={pgColor ? pgColor : Colors.midBlue}
          fill="none"
          cx={outerCircleRadius}
          cy={outerCircleRadius}
          r={radius}
          strokeDasharray={remainingProgressDashArray}
          strokeDashoffset={remainingProgressDashOffset}
          strokeLinecap="butt"
          transform={`rotate(-90, ${outerCircleRadius}, ${outerCircleRadius})`}
          {...{strokeWidth}}
        />

        {/* Text */}
        <SVGText
          fontSize={textSize ? textSize : '10'}
          x={outerCircleRadius}
          y={outerCircleRadius + (textSize ? textSize / 2 - 1 : 5)}
          textAnchor="end"
          fill={textColor ? textColor : Colors.greenColor}>
          <View
            style={[
              styles.container,
              {marginTop: (size - 5 * strokeWidth) / 2},
            ]}>
            <Text style={styles.text}>{progressPercent}%</Text>
            <Text style={styles.subText}>{text}</Text>
          </View>
        </SVGText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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

export default CircularProgress;
