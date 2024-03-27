import {
  ColorValue,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, Icon, RadioButton} from 'react-native-paper';
import CustomScrollView from './custom_scroll_view';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import React from 'react';
import Colors from '../../../core/styles/app_colors';
import {CustomBottomSheet} from './custom_bottom_sheet';
import CustomButton from './custom_button';
import useDimensions from '../hooks/useDimensions.hook';

interface IFilterBottomSheetProps {
  type?: 'checkbox' | 'radio' | 'Icon';
  bottomLeftText: string;
  bottomRight: {icon: IconSource; text: string; count?: number};
  headerText: string;
  filterOptions?: {
    text: string;
    badgeOne?: {text: string; icon?: IconSource};
    badgeTwo?: string;
    isSelected: boolean;
  }[];
  handleClick: (
    type?:
      | 'cancel'
      | 'open'
      | 'bottomLeftButton'
      | 'bottomRightButton'
      | 'tailListItem',
    index?: number,
  ) => void;
  sheetAttributes: {
    heightPercent: number;
    backGroundColor?: string;
  };
  isVisible: boolean;
}

export const FilterBottomSheet = ({
  bottomLeftText,
  bottomRight,
  handleClick,
  headerText,
  filterOptions,
  type,
  sheetAttributes,
  isVisible,
}: IFilterBottomSheetProps) => {
  const {screenHeight} = useDimensions()


  return (
    <CustomBottomSheet
      animationType="slide"
      heightPercent={sheetAttributes.heightPercent}
      isVisble={isVisible}
      handleClose={() => handleClick('cancel')} backgroundColor={sheetAttributes.backGroundColor}>
      <View style={styles.bottomSheetTopStyle}>
        <View style={styles.bottomSheetTopContainerStyle}>
          <TouchableOpacity
            onPress={() => {
              handleClick('cancel');
            }}>
            <Icon source={'close'} size={24} />
          </TouchableOpacity>
          <Text style={styles.bottomSheetItemTextStyle}>{headerText}</Text>
        </View>
        <CustomScrollView
          height={(screenHeight * sheetAttributes.heightPercent) / 100 - 132}>
          <View>
            {filterOptions?.map((option, index) => (
              <View key={index} style={styles.bottomSheetItemStyle}>
                <View style={styles.bottomSheetItemLeftStyle}>
                  <Text style={styles.bottomSheetItemTextStyle}>
                    {option.text}
                  </Text>
                  {option.badgeOne && (
                    <View style={styles.bottomSheetItemCountStyle}>
                      {option.badgeOne.icon && (
                        <Icon
                          source={option.badgeOne.icon}
                          size={18}
                          color={Colors.unfocusedColor}
                        />
                      )}
                      <Text style={styles.bottomSheetItemCountTextStyle}>
                        {option.badgeOne.text}
                      </Text>
                    </View>
                  )}
                  {option.badgeTwo && (
                    <View
                      style={[
                        styles.bottomSheetItemTwoStyle,
                        {
                          backgroundColor: (option.isSelected
                            ? Colors.frost
                            : Colors.backgroundColor) as ColorValue,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.bottomSheetItemCountTwoTextStyle,
                          {
                            color: (option.isSelected
                              ? Colors.leafGreen
                              : Colors.darkGray) as ColorValue,
                          },
                        ]}>
                        {option.badgeTwo}
                      </Text>
                    </View>
                  )}
                </View>
                {type === 'checkbox' ? (
                  <Checkbox
                    status={option.isSelected ? 'checked' : 'unchecked'}
                    onPress={() => handleClick('tailListItem', index)}
                    uncheckedColor={Colors.greyColor}
                    color={Colors.greenColor}
                  />
                ) : type === 'radio' ? (
                  <RadioButton
                    status={option.isSelected ? 'checked' : 'unchecked'}
                    onPress={() => handleClick('tailListItem', index)}
                    uncheckedColor={Colors.greenColor}
                    value={option.text}
                    color={Colors.greenColor}
                  />
                ) : type === 'Icon' ? (
                  <TouchableOpacity
                    style={{paddingVertical: 6 as DimensionValue}}
                    onPress={() => handleClick('tailListItem', index)}>
                    <Icon
                      source={'fast-forward-outline'}
                      size={24}
                      color={
                        option.isSelected
                          ? Colors.iconGreen
                          : Colors.unfocusedColor
                      }
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{paddingVertical: 18 as DimensionValue}} />
                )}
              </View>
            ))}
          </View>
        </CustomScrollView>
        <View style={styles.bottomSheetBottomContainerStyle}>
          <CustomButton
            textStyle={styles.bottomSheetBottomTextStyle}
            onPress={() => handleClick('bottomLeftButton')}
            title={bottomLeftText}
            mode="text"
            width={100}
          />
          <CustomButton
            title={`${bottomRight.text} ${
              bottomRight.count ? `(${bottomRight.count})` : ''
            }`}
            icon={
              <Icon source={bottomRight.icon} size={22} color={Colors.white} />
            }
            height={48}
            width={249}
            onPress={() => {
              handleClick('bottomRightButton');
            }}
            mode="contained"
          />
        </View>
      </View>
    </CustomBottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetTopStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: 'auto',
  },
  bottomSheetTopContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderColor: Colors.backgroundColor,
    borderBottomWidth: 1,
  },
  bottomSheetItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    borderColor: Colors.backgroundColor,
    borderBottomWidth: 1.5,
    paddingVertical: 13,
  },
  bottomSheetItemLeftStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bottomSheetItemTextStyle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.darkGray,
    fontFamily: 'Uni Neue',
  },
  bottomSheetItemCountStyle: {
    backgroundColor: Colors.smokeWhite,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 6,
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  bottomSheetItemCountTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Uni Neue',
    fontWeight: '700',
    color: Colors.unfocusedColor,
    textAlign: 'center',
  },
  bottomSheetItemTwoStyle: {
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    height: 20,
    gap: 4,
  },
  bottomSheetItemCountTwoTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Uni Neue',
    fontWeight: '700',
  },
  bottomSheetBottomContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 12,
    borderColor: Colors.backgroundColor,
    justifyContent: 'space-between',
  },
  bottomSheetBottomTextStyle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: Colors.greenColor,
    fontFamily: 'Uni Neue',
    paddingHorizontal: 12,
  },
});
