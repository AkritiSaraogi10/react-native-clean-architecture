import {useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager, Device} from 'react-native-ble-plx';

type PermissionCallback = (result: boolean) => void;

const bleManager = new BleManager();

interface BluetoothLowEnergyApi {
  requestPermissions(callback: PermissionCallback): Promise<void>;
  scanForDevices(): void;
  allDevices: Device[];
}

export default function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      callback(
        result['android.permission.BLUETOOTH_CONNECT'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      callback(true);
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const readDeviceName = async (device: Device) => {
    try {
      await device.connect();
      const deviceTemp =
        await bleManager.discoverAllServicesAndCharacteristicsForDevice(
          device.id,
        );
      const nameCharacteristic = (await deviceTemp.services()).find(
        async service =>
          (await service.characteristics()).some(
            char => char.uuid === 'characteristic UUID for device name',
          ),
      );
      if (nameCharacteristic) {
        console.log(nameCharacteristic, 'name characteristic');
      } else {
        console.log('Device name characteristic not found');
      }
    } catch (error) {
      console.error('Error reading device name:', error);
    } finally {
    }
  };

  const scanForDevices = async () => {
    bleManager.startDeviceScan(
      null,
      {allowDuplicates: false},
      (error, device) => {
        if (error) {
          console.log(error);
        }

        if (device && device.id && device.id !== '') {
          setAllDevices(prevState => {
            if (!isDuplicateDevice(prevState, device)) {
              return [...prevState, device];
            }
            return prevState;
          });
          readDeviceName(device);
          console.log(device.id, device.name, device.localName);
          bleManager.stopDeviceScan();
        }
      },
    );
  };

  return {
    requestPermissions,
    scanForDevices,
    allDevices,
  };
}
