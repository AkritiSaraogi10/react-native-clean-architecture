import {View, Text, Button, TextInput} from 'react-native';
import React from 'react';
import usePostScreenData from './post_screen_utils';
import {IPost} from '../../domain/entities/post_entity';
export default function PostScreen() {
  const {
    posts,
    // formFields,
    handleAddPost,
    handleDeletePost,
    // handleInputChange,
    formFields2,
    handleInputChange2,
  } = usePostScreenData();

  // Function to render each post item UI -- try to avoid multiple render function as much as possible
  // for instance this can be separate component called as Post
  const renderItem = (item: IPost) => (
    <View
      key={item?._id?.toString()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        padding: 4,
        marginBottom: 8,
        backgroundColor: '#E1DFDD',
      }}>
      <Text>{item.title}</Text>
      <Button
        title="Delete"
        onPress={() => handleDeletePost(item?._id?.toString())}
      />
    </View>
  );

  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>
        Post Screen
      </Text>
      {/* <View style={{marginHorizontal: 20, marginTop: 20}}>
        {Object.values(formFields).map((field, index) => (
          <TextInput
            key={field.key}
            style={{marginBottom: 10, padding: 10, borderBottomWidth: 1}}
            placeholder={field.key.charAt(0).toUpperCase() + field.key.slice(1)}
            value={field.value}
            onChangeText={text => handleInputChange(field.key, text)}
          />
        ))}
        <Button
          title="Add Post"
          onPress={() => handleAddPost(formFields)}
          disabled={
            // this is okay but should not be used
            (formFields.title.value && formFields.description.value) === ''
          }
        />
      </View> */}

      <View style={{marginHorizontal: 20, marginTop: 20}}>
        {formFields2.map((field, index) => (
          <TextInput
            key={field.key}
            style={{marginBottom: 10, padding: 10, borderBottomWidth: 1}}
            placeholder={field.key.charAt(0).toUpperCase() + field.key.slice(1)}
            value={field.value}
            onChangeText={text => handleInputChange2(index, text)}
          />
        ))}
        {/* <Button title="Add Post" onPress={() => handleAddPost(formFields2)} /> */}
      </View>

      <View style={{marginTop: 20, marginHorizontal: 20}}>
        {posts.slice(0, 7).map(item => renderItem(item))}
      </View>
    </View>
  );
}
