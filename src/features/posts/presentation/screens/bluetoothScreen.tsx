import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Modal, TouchableOpacity, Alert } from 'react-native';
import useBLE from '../../../../shared/presentation/hooks/useBLE';
import Colors from '../../../../core/styles/app_colors';
import { Device } from 'react-native-ble-plx';
import Icon from 'react-native-vector-icons/EvilIcons';

export const BluetoothScreen = () => {
  const { requestPermissions,
    scanForDevices,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    scanningError,
    scanning,
    deviceName,
    deviceValue,
    BLTManager } = useBLE();

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    const subscription = BLTManager.onStateChange((state) => {
      if (state === 'PoweredOff') {
        Alert.alert(
          '"App" would like to use Bluetooth.',
          'This app uses Bluetooth to connect to and share information with your device.',
          [
            {
              text: "Don't allow",
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: "Turn ON",
              onPress: () => {
                BLTManager.enable();
              }
            },
          ]
        );
        subscription.remove();
      }
    }, true);
    return () => {
      subscription.remove();
    };
  }, [BLTManager]);


  const scanForPeripherals = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForDevices();
      }
    });
  };

  const handleConnect = (device: Device) => {
    if (connectedDevice && connectedDevice.id !== device.id) {

      Alert.alert(
        'Error',
        'Please disconnect from the currently connected device before connecting to a new one.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ]
      );
      return;
    }

    if (connectedDevice && connectedDevice.id === device.id) {
      disconnectFromDevice(device);
    } else {
      connectToDevice(device);
    }
  };


  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const handleDeviceNamePress = (device: Device) => {
    if (connectedDevice && connectedDevice.id === device.id) {
      setBottomSheetVisible(true);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: Colors.white }}>
      {!allDevices.length && (
        <Button title={scanning ? "SCANNING..." : "SCAN"} onPress={scanForPeripherals} disabled={scanning} />
      )}
      {scanningError && <Text style={styles.error}>{scanningError}</Text>}
      <View style={styles.deviceList}>
        {allDevices.map(device => (
          <View key={device.id} style={styles.deviceItem}>
            <TouchableOpacity onPress={() => handleDeviceNamePress(device)}>
              <Text>{device.id}</Text>
            </TouchableOpacity>
            <Button
              title={connectedDevice && connectedDevice.id === device.id ? 'Disconnect' : 'Connect'}
              onPress={() => handleConnect(device)}
            />
          </View>
        ))}
      </View>

      {connectedDevice && (
        <Modal visible={bottomSheetVisible} animationType="slide" transparent={true} style={{ borderRadius: 10 }}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>{connectedDevice.id} {connectedDevice.name}</Text>
              <TouchableOpacity onPress={toggleBottomSheet}>
                <Icon
                  name="close"
                  color={Colors.black}
                  size={22} />
              </TouchableOpacity>
            </View>
            <View style={styles.bottomSheetContent}>
              <Text style={styles.textstyle}>Device Name: {deviceName}</Text>
              <Text style={styles.textstyle}>Device Value: {deviceValue}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  deviceList: {
    marginTop: 20,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    borderRadius: 10
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  closeIcon: {
    fontSize: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSheetContent: {
    backgroundColor: '#fff',
    padding: 20,
    height: '60%',
  },
  textstyle: {
    color: 'blue',
    fontSize: 16
  }
});

export default BluetoothScreen;
