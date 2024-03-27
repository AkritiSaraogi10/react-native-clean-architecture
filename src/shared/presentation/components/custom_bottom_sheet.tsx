import {
  ColorValue,
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import useDimensions from '../hooks/useDimensions.hook';

interface ICustomBottomSheetProps {
  children: JSX.Element;
  heightPercent: number;
  animationType?: 'none' | 'slide' | 'fade' | undefined;
  isVisble: boolean;
  handleClose: () => void;
  backgroundColor?: ColorValue;
}

export const CustomBottomSheet = ({
  children,
  heightPercent,
  animationType,
  isVisble,
  handleClose,
  backgroundColor,
}: ICustomBottomSheetProps) => {
  const {screenHeight} = useDimensions();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(screenHeight * (heightPercent / 100));
  }, [heightPercent, screenHeight]);

  const styles = getStyles(height, backgroundColor);

  return (
    <Modal visible={isVisble} animationType={animationType} transparent={true} onRequestClose={handleClose}>
      <View style={styles.modalContainer}>
        <View style={styles.alertContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const getStyles = (height: number, backgroundColor?: ColorValue) => {
  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
    },
    alertContainer: {
      position: 'absolute',
      backgroundColor: 'white',
      height: height,
      width: '100%',
      borderWidth: 1,
      borderColor: '#fff',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      elevation: 10,
      bottom: 0,
      right: 0,
      left: 0,
    },
  });
};
