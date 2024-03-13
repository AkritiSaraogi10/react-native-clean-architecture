import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox, Icon} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomScrollView from './custom_scroll_view';

interface FilterItem {
  key: string;
  label: string;
  isSelected: boolean;
  hasBottomSheet: boolean;
  filterByOptions: {
    text: string;
    subText: number;
    isSelected: boolean;
  }[];
}

interface IFilter {
  [key: string]: FilterItem;
}

export interface IFilterByProps {
  isSelected?: boolean;
  hasBottomSheet?: boolean;
  filterOptions?: {text: string; subText: number; isSelected: boolean}[];
  handleClick: (
    key: string,
    type?: 'cancel' | 'clearAll' | 'showAll' | 'checkbox',
    index?: number,
  ) => void;
  label: string;
  isVisible?: boolean;
  id: string;
}

const FilterByComponent = ({
  isSelected,
  hasBottomSheet,
  handleClick,
  label,
  id,
  filterOptions,
}: IFilterByProps) => {
  let total = 0;
  filterOptions?.forEach(option => {
    if (option.isSelected) {
      total = total + option.subText;
    }
  });

  const bottomSheetRef = useRef<RBSheet>(null);

  const styles = StyleSheet.create({
    touchableOpacityContainer: {
      backgroundColor: isSelected ? '#DEE6C5' : 'white',
      borderColor: 'black',
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
      color: '#2C331C',
      alignItems: 'center',
      fontWeight: '700',
      fontFamily: 'Uni Neue',
      fontSize: 16,
      paddingBottom: 2,
      lineHeight: 20,
    },
    bottomSheetTopStyle: {
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      backgroundColor: 'white',
      height: 'auto',
    },
    bottomSheetTopContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 24,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderColor: '#E5E5E5',
      borderBottomWidth: 1,
    },
    bottomSheetItemStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      alignItems: 'center',
      borderColor: '#E5E5E5',
      borderBottomWidth: 1,
      paddingVertical: 12,
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
      color: '#303030',
      fontFamily: 'Uni Neue',
    },
    bottomSheetItemCountStyle: {
      backgroundColor: '#F9F9F9',
      borderRadius: 100,
      paddingVertical: 4,
      paddingHorizontal: 6,
    },
    bottomSheetItemCountTextStyle: {
      fontSize: 14,
      lineHeight: 16,
      fontFamily: 'Uni Neue',
      fontWeight: '700',
    },
    bottomSheetBottomContainerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingTop: 16,
      paddingHorizontal: 16,
      borderColor: '#E5E5E5',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
    },
    bottomSheetBottomTextStyle: {
      fontSize: 18,
      lineHeight: 24,
      fontWeight: '700',
      color: '#4C6700',
      fontFamily: 'Uni Neue',
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    showAllButtonContainer: {
      backgroundColor: '#4C6700',
      borderRadius: 100,
      gap: 8,
      flex: 1,
      borderWidth: 0.4,
      height: 48,
      width: 249,
      borderColor: '#4C6700',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingLeft: 35,
    },
    showAllButtonText: {
      justifyContent: 'center',
      flex: 1,
      color: 'white',
      fontSize: 18,
    },
  });

  return (
    <View>
      <TouchableOpacity
        style={styles.touchableOpacityContainer}
        onPress={() => {
          handleClick(id);
          hasBottomSheet && bottomSheetRef.current?.open();
        }}
      >
        <View style={styles.viewContainer}>
          {isSelected && <Icon source="check" size={20} />}
          <Text style={styles.textStyle}>{label}</Text>
          {hasBottomSheet && <Icon source="menu-down" size={20} />}
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={bottomSheetRef}
        animationType="slide"
        height={128 + (filterOptions ? filterOptions.length * 62 : 0)}
        customStyles={{
          container: {borderTopLeftRadius: 16, borderTopRightRadius: 16},
        }}
      >
        <View style={styles.bottomSheetTopStyle}>
          <View style={styles.bottomSheetTopContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef.current?.close();
                handleClick(id, 'cancel');
              }}
            >
              <Icon source={'close'} size={24} />
            </TouchableOpacity>
            <Text style={styles.bottomSheetItemTextStyle}>Filter by Type</Text>
          </View>
          {filterOptions?.map((option, index) => (
            <View key={index} style={styles.bottomSheetItemStyle}>
              <View style={styles.bottomSheetItemLeftStyle}>
                <Text style={styles.bottomSheetItemTextStyle}>
                  {option.text}
                </Text>
                <View style={styles.bottomSheetItemCountStyle}>
                  <Text style={styles.bottomSheetItemCountTextStyle}>
                    {option.subText}
                  </Text>
                </View>
              </View>
              <Checkbox
                status={option.isSelected ? 'checked' : 'unchecked'}
                onPress={() => handleClick(id, 'checkbox', index)}
                color="#4C6700"
              />
            </View>
          ))}
          <View style={styles.bottomSheetBottomContainerStyle}>
            <Text
              style={styles.bottomSheetBottomTextStyle}
              onPress={() => handleClick(id, 'clearAll')}
            >
              Clear All
            </Text>
            <TouchableHighlight
              style={styles.showAllButtonContainer}
              onPress={() => {
                handleClick(id, 'showAll');
                bottomSheetRef.current?.close();
              }}
            >
              <>
                <Icon source={'arrow-right'} size={22} color="white" />
                <Text style={styles.showAllButtonText}>
                  Show Results ({total})
                </Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export const FilterByBar = ({
  filters,
  handleClick,
}: {
  filters: IFilter;
  handleClick: (
    key: string,
    type?: 'cancel' | 'clearAll' | 'showAll' | 'checkbox',
    index?: number,
  ) => void;
}) => {
  const styles = StyleSheet.create({
    containerStyle: {flexDirection: 'row', gap: 10, paddingHorizontal: 10},
  });
  return (
    <CustomScrollView
      height={40}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
    >
      <View style={styles.containerStyle}>
        {Object.values(filters).map((filter, index) => (
          <FilterByComponent
            key={index}
            handleClick={handleClick}
            label={filter.label}
            hasBottomSheet={filter.hasBottomSheet}
            isSelected={filter.isSelected}
            id={filter.key}
            filterOptions={filter.filterByOptions}
          />
        ))}
      </View>
    </CustomScrollView>
  );
};

export default FilterByBar;
