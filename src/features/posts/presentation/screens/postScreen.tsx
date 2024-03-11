import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {GetPostsUseCase} from '../../domain/usecases/get_post_usecase';
import {PostRepositoryImpl} from '../../data/repository/post_repository_impl';
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import AxiosOperations from '../../../../core/network/axios/axios_operations';

const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(postDataAPIImp);
const getPostsUseCase = new GetPostsUseCase(postRepositoryImpl);

const getPostsFunc = async () => {
  const result = await getPostsUseCase.getPosts();
  console.log('result--->', result);
};

export default function PostScreen() {
  useEffect(() => {
    getPostsFunc();
  }, []);

  return (
    <View>
      <Text>Post Screen</Text>
    </View>
  );
}
