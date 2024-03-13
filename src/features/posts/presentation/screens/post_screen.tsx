import {View, Text, FlatList, TouchableHighlight, StatusBar, Button} from 'react-native';
import React from 'react';
import usePostScreenData from './post_screen_utils';

export default function PostScreen() {

  const{users, handleButtonClick, handleDeleteUser} = usePostScreenData();

  const renderItem = ({ item }: any) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, padding: 4, marginBottom: 8, backgroundColor: '#E1DFDD' }}>
      <Text>{item.title}</Text>
      <Button title='Delete' onPress={() => handleDeleteUser(item._id)}/>
    </View>
  );
  
  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>Post Screen</Text>
            <View>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />
      </View>
      <TouchableHighlight style={{backgroundColor: 'yellow', height: 60, alignItems: 'center', justifyContent: 'center'}} onPress={handleButtonClick}><Text>Add User</Text></TouchableHighlight>
    </View> 
  );
}
