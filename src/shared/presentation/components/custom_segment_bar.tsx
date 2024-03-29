import {
  DimensionValue,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {Icon, SegmentedButtons} from 'react-native-paper';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import Colors from '../../../core/styles/app_colors';
import { Dispatch } from 'react';

interface ISegmentBarProps {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  buttons: IButtonType[];
}

interface IButtonType {
  value: string;
  label: string;
  iconSource?: IconSource;
  iconColor?: string;
}

const CustomSegmentBar = ({value, setValue, buttons}: ISegmentBarProps) => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            ...buttons.map(button => ({
              value: button.value,
              label: button.label,
              style: {
                borderRadius: 8,
                borderBottomRightRadius: 8,
                borderTopRightRadius: 8,
                borderBottomLeftRadius: 8,
                borderTopLeftRadius: 8,
                borderWidth: 0,
                elevation: value === button.value ? 5 : 0,
                backgroundColor:
                  value === button.value
                    ? Colors.white
                    : Colors.lightSmokeWhite,
                width: '100%' as DimensionValue | undefined,
              },
              icon: () =>
                button.iconSource
                  ? ((
                      <Icon
                        source={button.iconSource}
                        size={20}
                        color={button.iconColor ? button.iconColor : Colors.black}
                      />
                    ) as JSX.Element)
                  : undefined,
              labelStyle: {
                color: Colors.darkGray,
                fontSize: 14,
                fontFamily: 'Uni Neue',
              },
            })),
          ]}
          density="regular"
          style={styles.segmentContainer}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 4,
  },
  segmentContainer: {
    height: 45,
    backgroundColor: '#F4F4F4',
    padding: 4,
    borderRadius: 12,
    justifyContent: 'center',
  },
});

export default CustomSegmentBar;
