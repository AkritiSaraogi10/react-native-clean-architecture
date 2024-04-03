import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
type VoidCallback = (result: boolean) => void;

const bleManager = new BleManager();

interface BluetoothLowEnergyApi {
  requestPermissions(callback: VoidCallback): Promise<void>;
  scanForDevices(): void;
  connectToDevice(device: Device): Promise<void>;
  allDevices: Device[];
  deviceValue: any;
  deviceName: any;
  disconnectFromDevice(device: Device): void;
  scanning: boolean;
  connectedDevice: Device | null;
  scanningError: string | null;
  BLTManager: BleManager;
}
export default function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [serviceID, setServiceID] = useState(
    '0c2ad08c-5065-49ed-a6e3-5a8a05cee69b',
  );
  const [deviceValue, setdeviceValue] = useState(0);
  const [deviceName, setdeviceName] = useState(0);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [scanningError, setScanningError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);


  //request permission for android
  const requestPermissions = async (cb: VoidCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel();

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonNeutral: 'Ask Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
          PermissionsAndroid.RESULTS.GRANTED;

        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;


  const scanForDevices = async () => {
    setScanning(true);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error in scanning devices:', error);
        setScanningError(error.message);
        setScanning(false);
        return;
      }
      if (device) {
        console.log(device);
        console.log(
          'Device serviceUUIDs:',
          device.discoverAllServicesAndCharacteristics(),
        );
        setAllDevices(prevState => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
        bleManager.stopDeviceScan();
        setScanning(false);
      }
    });
  };


  //connect device
  const connectToDevice = async (device: Device) => {
    console.log('Connecting to:', device.id, device.name);
    setdeviceName(device.name);
    try {
      await bleManager.connectToDevice(device.id);
      console.log(`Device ${device.id} connected successfully!`);
      setConnectedDevice(device);
      const discoverAllServicesAndCharacteristics =
        await device.discoverAllServicesAndCharacteristics();
      // console.log(
      //   'Services and characteristics discovered',
      //   discoverAllServicesAndCharacteristics,
      // );
      const deviceServices = await bleManager.servicesForDevice(device.id);
      for (const service of deviceServices) {
        const characteristics = await bleManager.characteristicsForDevice(
          device.id,
          service.uuid,
        );
        for (const characteristic of characteristics) {
          console.log('Characteristic Value for', characteristic.uuid);
          enableCharacteristicIndication(characteristic);

        }
      }
    } catch (error) {
      console.log('ERROR-->', error);
    }
  };

  const disconnectFromDevice = (device: Device) => {
    if (connectedDevice) {
      try {
        bleManager.cancelDeviceConnection(device.id);
        setConnectedDevice(null);
        console.log('Device disconnected successfully.');
      } catch (error) {
        console.error('Error disconnecting from device:', error);
      }
    } else {
      console.warn('No connected device to disconnect.');
    }
  };

  const base64ToBinary = (base64String) => {
    const base64Chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let binaryString = "";
    let padding = 0;
    // Convert each character of the Base64 string to its corresponding 6-bit binary representation
    for (let i = 0; i < base64String.length; i++) {
      if (base64String[i] === "=") {
        padding++;
        continue;
      }

      const charIndex = base64Chars.indexOf(base64String[i]);
      const binaryRepresentation = charIndex.toString(2).padStart(6, "0");
      binaryString += binaryRepresentation;
    }

    // Remove the padding bits
    binaryString = binaryString.slice(0, -padding * 2);

    // Convert the binary string to binary data (Uint8Array)
    const binaryData = new Uint8Array(binaryString.length / 8);
    for (let i = 0; i < binaryData.length; i++) {
      binaryData[i] = parseInt(
        binaryString.slice(i * 8, (i + 1) * 8),
        2
      );
    }

    return binaryData;
  };

  const enableCharacteristicIndication = async (
    characteristic: Characteristic,
  ) => {
    if (!characteristic) {
      console.warn('No characteristic selected');
      return;
    }
    try {
      bleManager.monitorCharacteristicForDevice(
        characteristic.deviceID,
        characteristic.serviceUUID,
        characteristic.uuid,
        (error, characteristic) => {
          if (error) {
            console.error('Error at receiving data from device', error);
            return;
          } else {
            const base64ToBinaryd = base64ToBinary(characteristic.value);
            const bytes = base64ToBinaryd;
            const value = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24);
            setdeviceValue(value);
          }
        },
      );
    } catch (error) {
      console.error('Enable indication error:', error);
    }
  };

  return {
    requestPermissions,
    scanForDevices,
    connectToDevice,
    allDevices,
    deviceValue,
    disconnectFromDevice,
    scanningError,
    connectedDevice,
    deviceName,
    scanning,
    BLTManager: bleManager
  };
}
