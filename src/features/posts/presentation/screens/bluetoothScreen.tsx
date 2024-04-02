import { useState } from 'react';
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomBottomSheet } from '../../../../shared/presentation/components/custom_bottom_sheet';
import useBLE from '../../../../shared/presentation/hooks/useBLE';
import Colors from '../../../../core/styles/app_colors';

export const BluetoothScreen = () => {
  const [visible, setVisible] = useState(false);
  const { requestPermissions, scanForDevices, allDevices, deviceValue, deviceName } = useBLE();

  const scanForPeripherals = () => {
    requestPermissions(isGranted => {
      // console.log('isGranted--> ', isGranted);
      if (isGranted) {
        scanForDevices();
      }
    });
  };


  const closeSheet = () => {
    setVisible(false);
  };

  const openSheet = () => {
    if(!visible)
   { scanForPeripherals();
    setVisible(true);
    console.log(allDevices);
  }
  else
  setVisible(false);

  };


  return (
    <SafeAreaView  style={styles.container}>
      <TouchableOpacity onPress={() => openSheet()} style={{ height: 20, margin: 20 }}>
        <Text>{!visible?"Scan Value":"Close Scan"}</Text>
      </TouchableOpacity>
      {visible ? <View style={{ height: 100, margin: 20 }} >
        <Text style={styles.bigBlue}>Device Name </Text>
        <Text style={styles.red}>{deviceName ? deviceName : "NA"} </Text>

        <Text style={styles.bigBlue}>Value</Text>
        <Text style={styles.red}>{deviceValue ? deviceValue : "0"}</Text>

      </View> : <Text>"none"</Text>}

      {/* 
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
      </CustomBottomSheet> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 30,
  },
});
