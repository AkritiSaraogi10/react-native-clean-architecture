import React from 'react';
import {ColorValue, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomScrollView from './custom_scroll_view';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {FilterBottomSheet} from './filter_bottom_sheet';
import Colors from '../../../core/styles/app_colors';

interface FilterItem {
  key: string;
  label: string;
  isSelected: boolean;
  bottomSheet?: { heightPercent: number; backGroundColor?: string };
  filterByOptions?: {
    text: string;
    badgeOne?: {text: string; icon?: IconSource};
    badgeTwo?: string;
    isSelected: boolean;
  }[];
  type?: string;
}

export interface IFilter {
  [key: string]: FilterItem;
}

export const HorizantolTabs = ({
  filters,
  handleClick,
  bottomLeftText,
  bottomRight,
  listItemTail,
  headerText,
  bottomSheetRef,
}: {
  filters: IFilter;
  handleClick: (
    key: string,
    type?: 'cancel' | 'open' | 'bottomLeftButton' | 'bottomRightButton' | 'tailListItem',
    index?: number,
  ) => void;
  listItemTail?: 'checkbox' | 'radio' | 'Icon';
  bottomLeftText: string;
  bottomRight: {icon: IconSource; text: string; count?: number};
  headerText: string;
  bottomSheetRef?: React.RefObject<RBSheet>
}) => {
  const styles = StyleSheet.create({
    containerStyle: {flexDirection: 'row', gap: 10, paddingHorizontal: 10, alignItems: 'center'},
    touchableOpacityContainer: {
      borderColor: Colors.black,
      borderWidth: 0.4,
      height: 32,
      padding: 0,
      borderRadius: 8,
    },
    viewContainer: {
      flexDirection: 'row',
      borderRadius: 8,
      gap: 8,
      paddingHorizontal: 8,
      height: 32,
      alignItems: 'center',
      paddingBottom: 0,
    },
    textStyle: {
      color: Colors.focusedColor,
      alignItems: 'center',
      fontWeight: '700',
      fontFamily: 'Uni Neue',
      fontSize: 16,
      lineHeight: 20,
      textAlign: 'center',
    },
  });
  return (
    <CustomScrollView
      height={40}
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
      <View style={styles.containerStyle}>
        {Object.values(filters).map((filter, index) => (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.touchableOpacityContainer,
                {backgroundColor: (filter.isSelected ? Colors.frost : Colors.white) as ColorValue},
              ]}
              onPress={() => {
                filter.bottomSheet ? handleClick(filter.key, 'open') : handleClick(filter.key);
              }}>
              <View style={styles.viewContainer}>
                {filter.isSelected && <Icon source="check" size={20} />}
                <Text style={styles.textStyle}>{filter.label}</Text>
                {filter.bottomSheet && <Icon source="menu-down" size={20} />}
              </View>
            </TouchableOpacity>
            {filter.bottomSheet && (
              <FilterBottomSheet
                bottomLeftText={bottomLeftText}
                bottomRight={bottomRight}
                bottomSheetRef={bottomSheetRef}
                handleClick={(types, index2) =>
                  handleClick(filter.key, types, index2)
                }
                headerText={headerText}
                filterOptions={filter.filterByOptions}
                type={listItemTail}
                sheetAttributes={filter.bottomSheet}
              />
            )}
          </View>
        ))}
      </View>
    </CustomScrollView>
  );
};

export default HorizantolTabs;
