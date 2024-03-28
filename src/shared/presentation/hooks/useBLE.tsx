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

  const scanForDevices = async() => {
    bleManager.startDeviceScan(null, null, (error, device) => {
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
        console.log(device.id);
        // try {
        //     bleManager.connectToDevice(device.id).then(device1=>{ 

        //         console.log('Connected to device:', device1.name);  
                
        //         // Add your logic for handling the connected device 
                
        //         return device.discoverAllServicesAndCharacteristics(); 
        //     })
        // } catch (error) {
        //     console.log(error);
            
        // }
        // bleManager.stopDeviceScan()
        
    //    device
    //       .connect()
    //       .then(device1 => {
    //         console.log(device1.isConnectable, 'device 1');
    //         console.log(device1.discoverAllServicesAndCharacteristics());
            
            
    //         return device1.discoverAllServicesAndCharacteristics();
    //       })
    //       .then(device2 => {
    //         console.log(device2.id, 'device3');
            
    //         // Do work on device with services and characteristics
    //       })
    //       .catch(error2 => {
    //         console.log(error2, 'error2');
            
            // Handle errors
        //   });
          
      }
    });
  };

  return {
    requestPermissions,
    scanForDevices,
    allDevices,
  };
}
