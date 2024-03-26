import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const useDimensions = () => {
  const [dimensions, setDimensions] = useState({
    screenHeight: 0,
    screenWidth: 0,
    orientation: 'portrait',
  });

  useEffect(() => {
    const updateDimensions = () => {
      const {width, height} = Dimensions.get('window');
      setDimensions({
        screenWidth: width,
        screenHeight: width > height ? height - 20 : height,
        orientation: width > height ? 'landscape' : 'portrait',
      });
    };

    updateDimensions();

    const subscribe = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      subscribe.remove();
    };
  }, []);
  return dimensions;
};

export default useDimensions;
