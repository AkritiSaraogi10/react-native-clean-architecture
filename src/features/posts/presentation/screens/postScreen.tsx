import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GetPostsUseCase} from '../../domain/usecases/get_post_usecase';
import {PostRepositoryImpl} from '../../data/repository/post_repository_impl';
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import UserService from '../../../../shared/local_data/user/UserService';
import UserSchema from '../../../../shared/local_data/user/UserSchema';
import { IPost } from '../../domain/entities/post_entity';
import { BSON } from 'realm';
import { useRealm } from '@realm/react';

const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(postDataAPIImp);
const getPostsUseCase = new GetPostsUseCase(postRepositoryImpl);
const userService = UserService.getInstance();

const getPostsFunc = async () => {
  const result = await getPostsUseCase.getPosts().then((res)=> addUsers(res)).catch((e)=>{
    console.log('ERROR', e);
  });
};

const addUsers = (users: IPost[]) => {
  const transformedUsers = users.map((user) => {
    return {
      _id: new BSON.ObjectId(user.id),
      title: user.title,
      userId: user.userId.toString(),
      body: user.body,
    };
  }) as unknown as UserSchema[];

  userService.addUsersToRealm(transformedUsers);
}

export default function PostScreen() {
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      console.log('subs');
      mutableSubs.add(realm.objects(UserSchema));
    })
  }, [realm]);

  useEffect(() => {
    //getPostsFunc();
  }, []);

  const renderItem = ({ item }:any) => (
    <View>
      <Text onPress={() => {
        userService.updateUserToRealm({
          _id: item._id,
          title: item.title + item._id,
          userId: item.userId,
          body: item.body,
        })
      }}>{item.title}</Text>
    </View>
  );
  return (
    <View>
      <Text>Post Screen</Text>
      <FlatList
        data={userService.fetchAllUsersFromRealm()}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
