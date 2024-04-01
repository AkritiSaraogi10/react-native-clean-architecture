import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Colors from '../../../core/styles/app_colors';

interface ICarousel {
  data: string[];
  renderSliderContent: (content: string) => JSX.Element;
}

const Carousel = ({ data, renderSliderContent }: ICarousel) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateSlideWidth = () => {
      setSlideWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', updateSlideWidth);

    return () => {
      subscription.remove();
    };
  }, []);

  const onChange = (nativeEvent: any) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
      if (slide !== currentIndex) {
        setCurrentIndex(slide);
      }
    }
  };

  const renderIndicatorDots = () => {
    return data.map((item, index) => (
      <Animated.View
        key={index}
        style={[
          styles.normalDots,
          {
            backgroundColor: index === currentIndex ? Colors.darkGreen : Colors.midGray,
          },
        ]}
      />
    ));
  };
  

  return (
    <View style={styles.wrap}>
      <ScrollView
        onScroll={({ nativeEvent }) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.wrap}
      >
        {data.map((e: string, index: number) => (
          <View key={index} style={[styles.slide, { width: slideWidth }]}>
            {renderSliderContent(e)}
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorDot}>
        {renderIndicatorDots()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: '35%',
  },
  slide: {
    flex: 1,
  },
  indicatorDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  normalDots: {
    height: 5,
    width: 30,
    borderRadius: 2,
    marginHorizontal: 5,
  },
});

export default Carousel;