import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { useGetAllPostQuery } from '../../data/data_sources/post_data_api_impl_rtk';
import { RootStackParamList } from '../../../../core/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'PostScreen'>;

const PostScreen = ({ navigation }: Props) => {
  const { data: getAllPosts, isLoading: getAllPostsLoading, error: getAllPostsError } = useGetAllPostQuery();

  const onTapOfPosts = (postId: string) => {
    navigation.navigate('PostDetailsScreen', { postId: postId })
  }

  if (getAllPostsLoading) {
    return (<View>
      <ActivityIndicator size='large' />
    </View>)
  }

  if (getAllPostsError) {
    if ('status' in getAllPostsError) {
      const errMsg = 'error' in getAllPostsError ? getAllPostsError.error : JSON.stringify(getAllPostsError.data)

      return (
        <View>
          <Text>An error has occurred:</Text>
          <Text>{errMsg}</Text>
        </View>
      )
    } else {
      return <Text>{getAllPostsError.code}</Text>
    }
  }
  // if (getAllPostsError) {
  //   return (<View>
  //     <Text>Error</Text>
  //   </View>)
  // }

  return (
    <View style={{ padding: 10 }}>
      <View style={{ justifyContent: "space-between", flexDirection: 'row' }}>
        <Text style={{ textAlign: 'center', fontSize: 18 }}>All Posts</Text>
        <Text style={{ fontSize: 18, color: 'blue' }} onPress={() => { navigation.navigate('AddPostScreen') }}>
          Add Posts
        </Text>
      </View>

      <View>
        <FlatList keyExtractor={(item) => item.id.toString()}
          data={getAllPosts}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={() => onTapOfPosts(item.id)}>
                <Text style={{ color: 'black', fontSize: 15 }}>{item.title}</Text>
                <Text style={{ color: 'grey', fontSize: 12 }}>{item.body}</Text>
              </TouchableOpacity>
            </View>
          )} />
      </View>
    </View >
  )
}
export default PostScreen;