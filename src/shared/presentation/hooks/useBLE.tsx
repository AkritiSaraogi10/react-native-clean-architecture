import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager, Characteristic, Device} from 'react-native-ble-plx';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
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
}
export default function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [serviceID, setServiceID] = useState(
    '0c2ad08c-5065-49ed-a6e3-5a8a05cee69b',
  );
  const [deviceValue, setdeviceValue] = useState(0);
  const [deviceName, setdeviceName] = useState(0);


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

  //scxan device
  const scanForDevices = async () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error in scanning devices:', error);
        return;
      }
      if (device && device.name?.startsWith('Point-1-2D:9F')) {
        // a4d42b3e-d45b-42fe-9e65-05fd789dab75
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
        connectToDevice(device);
        bleManager.stopDeviceScan();
      }
    });
  };

  //connect device
  const connectToDevice = async (device: Device) => {
    console.log('Connecting to:', device.id, device.name);
    setdeviceName(device.name)
    try {
      await bleManager.connectToDevice(device.id);
      console.log(`Device ${device.id} connected successfully!`);

      //discovering all service and characteristics
      const discoverAllServicesAndCharacteristics =
        await device.discoverAllServicesAndCharacteristics();
      console.log(
        'Services and characteristics discovered',
        discoverAllServicesAndCharacteristics,
      );
      const discoverAllServicesAndCharacteristicsForDevice =
        await bleManager.discoverAllServicesAndCharacteristicsForDevice(
          device.id,
        );
      // console.log('discoverAllServicesAndCharacteristicsForDevice',discoverAllServicesAndCharacteristicsForDevice);

      //checking device services
      const deviceServices = await bleManager.servicesForDevice(device.id);
      // console.log(' deviceServices ',deviceServices);

      for (const service of deviceServices) {
        const characteristics = await bleManager.characteristicsForDevice(
          device.id,
          service.uuid,
        );
        // console.log('service.uuid ', service.uuid);

        // Read characteristics
        for (const characteristic of characteristics) {
          console.log('Characteristic Value for', characteristic.uuid);
          enableCharacteristicIndication(characteristic);
          // await bleManager.readCharacteristicForDevice(
          //   device.id,
          //   service.uuid,
          //   characteristic.uuid,
          // );
          // console.log(
          //   ' for loopCharacteristic Value',
          //   characteristic.uuid,
          // );
        }
      }

      // read char for services
      await readServices(device);
    } catch (error) {
      console.log('ERROR-->', error);
    }
  };

  const readServices = async (device: Device) => {
    try {
      const services = await device.services();
      const characteristics = await services[1].characteristics();
      console.log('Characteristics:', characteristics);
      console.log('Services:', services);
      for (const service of services) {
        const characteristics = await device.characteristicsForService(
          '0c2ad08c-5065-49ed-a6e3-5a8a05cee69b',
        );
        characteristics.forEach(characteristic => {
          // enableCharacteristicIndication(characteristic);
          console.log('Characteristic UUID:', characteristic.uuid);
          console.log('Characteristic Value:', characteristic.id);
        });
        break;
      }
    } catch (error) {
      console.error('Error reading services:', error);
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
            // const decodedString = decoder.decode(characteristic.value);
            const base64ToBinaryd = base64ToBinary(characteristic.value);
            const bytes = base64ToBinaryd;
            const value = bytes[0] | (bytes[1] << 8) | (bytes[2] << 16) | (bytes[3] << 24);
            //
         
            //
            
            setdeviceValue(value);
            // console.log(
            //   'characteristic --> value',
            //   characteristic.value,
            
            //   "base64ToBinaryd",
            //   base64ToBinaryd,
            //   "valueddd",
            //   value
            // );
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
    deviceName
  };
}
