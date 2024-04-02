import { useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  BleManager,
  Characteristic,
  Device,
} from 'react-native-ble-plx';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';

const SERVICE_UUID = '89d3502b-0f36-433a-8ef4-c502ad55f8dc';
const CHAR_UUID = 'af0badb1-5b99-43cd-917a-a77bc549e3cc';

const bleManager = new BleManager();

type VoidCallback = (result: boolean) => void;

interface BluetoothLowEnergyApi {
  requestPermissions(cb: VoidCallback): Promise<void>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  streamedData: string[]
}

function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [streamedData, setStreamedData] = useState<string[]>([]);

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

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }
      if (device) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      console.log("deviceConnection", deviceConnection)
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      const deviceData = await bleManager.discoverAllServicesAndCharacteristicsForDevice(device.id);
      console.log("deviceData-->  ", deviceData);

      const services = await device.services();
      for (const service of services) {
        const characteristics = await device.characteristicsForService(service.uuid);
        characteristics.forEach(characteristic => {
          startStreamingData(characteristic);
          console.log("Characteristic", characteristic);
          console.log("Characteristic UUID:", characteristic.descriptors, characteristic.uuid, characteristic.deviceID);
          console.log("Characteristic Value:", characteristic.id);
        });
      }

      bleManager.stopDeviceScan();
      // startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };
  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };
  const startStreamingData = async (device: Characteristic) => {
    if (device) {
      bleManager.monitorCharacteristicForDevice(
        device.deviceID,
        device.serviceUUID,
        device.uuid,
        (error, characteristic) => {
          if (error) {
            console.log("startStreamingData---> ", error)
          }
          if (characteristic) {
            if (characteristic && characteristic.value !== null) {
              setStreamedData(prevData => [
                ...prevData,
                characteristic.value as string
              ]);
              console.log('Monitor:', characteristic.value);
            }

          }
        }
      );
    } else {
      console.log('No Device Connected');
    }
  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    streamedData
  };
}

export default useBLE;