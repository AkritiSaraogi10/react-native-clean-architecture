import {useRef} from 'react';
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
  const styles = getStyleSheet(height);
  return (
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
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}>
        {children}
      </ScrollView>
    </View>
  );
};

const getStyleSheet = (height: DimensionValue) => {
  const styles = StyleSheet.create({
    container: {height: height ?? '100%'},
  });
  return styles;
};

export default CustomScrollView;
