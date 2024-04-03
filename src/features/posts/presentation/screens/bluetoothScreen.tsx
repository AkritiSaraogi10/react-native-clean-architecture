import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import useBLE from '../../../../shared/presentation/hooks/useBLE';
import Colors from '../../../../core/styles/app_colors';

const App = () => {
  const { requestPermissions, scanForDevices,
    connectedDeviceId,
    receivedData,
    receivedError } = useBLE();

  const scanForPeripherals = () => {
    requestPermissions(isGranted => {
      console.log('isGranted--> ', isGranted);
      if (isGranted) {
        scanForDevices();
      }
    });
  };

  return (
    <View style={{ padding: 20, backgroundColor: Colors.white }}>
      <Button title="Scan And Connect" onPress={() => scanForPeripherals()} />
      {connectedDeviceId && (
        <View style={{ marginTop: 20 }}>
          <Text>Connected Device ID: {connectedDeviceId.id} {connectedDeviceId.name}</Text>
        </View>
      )}


      {/* <FlatList
        data={receivedData}
        renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />


      <FlatList
        data={receivedError}
        renderItem={({ item }) => <Text>Error: {item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
      /> */}


      {receivedError && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}> Error:{receivedError}</Text>
        </View>
      )}
      {receivedData && (
        <View style={{ marginTop: 20 }}>
          <Text>Received Data: {receivedData}</Text>
        </View>
      )}
    </View>
  );
};

export default App;
