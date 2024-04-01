import {Dimensions, StyleProp, ViewStyle} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useEffect, useState } from 'react';

interface ICustomBottomSheetProps {
  customStyles?:
    | {
        wrapper?: StyleProp<ViewStyle>;
        container?: StyleProp<ViewStyle>;
        draggableIcon?: StyleProp<ViewStyle>;
      }
    | undefined;
  children: JSX.Element;
  bottomSheetRef?: React.RefObject<RBSheet>;
  heightPercent: number;
  closeOnPressBack?: boolean;
  closeOnDragDown?: boolean;
  closeOnPressMask?: boolean;
  animationType?: 'none' | 'slide' | 'fade' | undefined
}

export const CustomBottomSheet = ({
  customStyles,
  children,
  bottomSheetRef,
  heightPercent,
  closeOnDragDown,
  closeOnPressBack,
  closeOnPressMask,
  animationType,
}: ICustomBottomSheetProps) => {
  const screenHeight = Dimensions.get('window').height;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(screenHeight * (heightPercent / 100));
  },[heightPercent, screenHeight]);

  return (
    <RBSheet
      ref={bottomSheetRef}
      animationType={animationType}
      customStyles={customStyles}
      height={height}
      closeOnPressBack={closeOnPressBack}
      closeOnDragDown={closeOnDragDown}
      closeOnPressMask={closeOnPressMask}
      >
      {children}
    </RBSheet>
  );
};
