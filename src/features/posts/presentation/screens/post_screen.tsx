import {View, Text, FlatList, TouchableHighlight, StatusBar, Button} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GetPostsUseCase} from '../../domain/usecases/get_post_usecase';
import {PostRepositoryImpl} from '../../data/repository/post_repository_impl';
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import UserService from '../../../../shared/local_data/user/user_service';
import UserSchema from '../../../../shared/local_data/user/user_schema';
import { BSON } from 'realm';
import { RealmContext } from '../../../../shared/local_data/realm_config';

const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(postDataAPIImp);
const getPostsUseCase = new GetPostsUseCase(postRepositoryImpl);
const userService = UserService.getInstance();
const {useRealm} = RealmContext;

export default function PostScreen() {
  const realm = useRealm();
  const [users, setUsers] = useState<UserSchema[]>([]);

useEffect(() => {
    const realmColletion = userService.fetchAllUsersFromRealm();
    realmColletion.addListener((collection, changes) => {
        setUsers(collection.map(user => user));
    });

    return () => realmColletion.removeAllListeners();
}, [realm]); 

const renderItem = ({ item }: any) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, padding: 4, marginBottom: 8, backgroundColor: '#E1DFDD' }}>
    <Text>{item.title}</Text>
    <Button title='Delete' onPress={()=>{userService.deleteUserFromRealm(item._id)}}/>
  </View>
);

  const handleButtonClick = () => {
    const newUser = {
      _id: new BSON.ObjectId(),
      title: 'New Title',
      userId: '4',
      body: 'This is a new user added using the button',
    } as UserSchema;
  
    userService.addUserToRealm(newUser);
  };
  
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
