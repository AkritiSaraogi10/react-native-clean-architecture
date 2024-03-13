import React, {useRef} from 'react';
import {
  DimensionValue,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

interface ICustomScrollViewProps {
  children: JSX.Element;
  height: DimensionValue;
  showsVerticalScrollIndicator?: boolean;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
}

const CustomScrollView = ({
  children,
  height,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
  horizontal,
}: ICustomScrollViewProps) => {
  const lastScrollPosition = useRef(0);
  const styles = StyleSheet.create({
    container: {height: height ?? '100%', backgroundColor: 'white'},
  });
  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={event => {
            const currentScrollPosition = event.nativeEvent.contentOffset.y;
            if (currentScrollPosition > lastScrollPosition.current) {
              if (Keyboard.isVisible()) {
                Keyboard.dismiss();
              }
            }
            lastScrollPosition.current = currentScrollPosition;
          }}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        >
          {children}
        </ScrollView>
      </View>
    </>
  );
};

export default CustomScrollView;
