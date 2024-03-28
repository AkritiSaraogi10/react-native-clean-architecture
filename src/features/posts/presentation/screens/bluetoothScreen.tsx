import {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomBottomSheet} from '../../../../shared/presentation/components/custom_bottom_sheet';
import useBLE from '../../../../shared/presentation/hooks/useBLE';

export const BluetoothScreen = () => {
  const [visible, setVisible] = useState(false);
  const {requestPermissions, scanForDevices, allDevices} = useBLE();

  const closeSheet = () => {
    setVisible(false);
  };

  const openSheet = () => {
    console.log('hhhhj');
    
    requestPermissions((isGranted: boolean) => {
        if(isGranted) {
            scanForDevices();
        }
    })
    setVisible(true);

    console.log(allDevices);
    
  };
  return (
    <SafeAreaView>
      <View><Text>Bluetooth Devices</Text></View>
      <TouchableOpacity onPress={() => openSheet()} style={{ height: 20, margin: 20 }}><Text>Open Sheet</Text></TouchableOpacity>
      <CustomBottomSheet
        handleClose={closeSheet}
        heightPercent={50}
        isVisble={visible}
        animationType="slide">
        <View>
            {
                allDevices.map((device, index) => <View key={index} style={{ backgroundColor: 'blue' }}><Text>{device.id}</Text></View>)
            }
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};
