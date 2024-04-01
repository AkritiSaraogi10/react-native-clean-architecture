import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomBottomSheet } from '../../../../shared/presentation/components/custom_bottom_sheet';
import useBLE from '../../../../shared/presentation/hooks/useBLE';
import Colors from '../../../../core/styles/app_colors';

export const BluetoothScreen = () => {
  const [visible, setVisible] = useState(false);
  const { requestPermissions, scanForDevices, allDevices } = useBLE();


  const scanForPeripherals = () => {
    requestPermissions(isGranted => {
      console.log('isGranted--> ', isGranted);
      if (isGranted) {
        scanForDevices();
      }
    });
  };


  const closeSheet = () => {
    setVisible(false);
  };

  const openSheet = () => {
    scanForPeripherals();
    setVisible(true);
    console.log(allDevices);
  };


  return (
    <SafeAreaView>
      <Text>Bluetooth Devices</Text>
      <TouchableOpacity onPress={() => openSheet()} style={{ height: 20, margin: 20 }}>
        <Text>Open Sheet</Text></TouchableOpacity>
      <CustomBottomSheet
        handleClose={closeSheet}
        heightPercent={50}
        isVisble={visible}
        animationType="slide">
        <View>
          {
            allDevices.map((device, index) => <View key={index} style={{ backgroundColor: 'blue' }}>
              <Text style={{ color: Colors.white }}>{device.id} {device.name} {device.localName}</Text></View>)
          }
        </View>
      </CustomBottomSheet>
    </SafeAreaView>
  );
};
