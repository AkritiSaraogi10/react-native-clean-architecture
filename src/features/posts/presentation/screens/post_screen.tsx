import { View, Text, Button, TextInput } from 'react-native';
import React from 'react';
import usePostScreenData from './post_screen_utils'; // Importing custom hook for managing screen data
import { IPost } from '../../domain/entities/post_entity'; // Importing Post entity type

export default function PostScreen() {

  // Destructuring values from the post_screen_utils hook
  const { posts, formFields, handleAddPost, handleDeletePost, handleInputChange } = usePostScreenData();

  // Function to render each post item UI
  const renderItem = (item: IPost) => (
    <View key={item?._id?.toString()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 50, padding: 4, marginBottom: 8, backgroundColor: '#E1DFDD' }}>
      <Text>{item.title}</Text>
      <Button title='Delete' onPress={() => handleDeletePost(item?._id?.toString())} />
    </View>
  );

  return (
    <View>
      <Text style={{ fontWeight: 'bold', fontSize: 16, alignSelf: 'center' }}>Post Screen</Text>
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        {/* Looping through formfields and rendering TextInput for each */}
        {Object.values(formFields).map((field, index) => (
          <TextInput
            key={field.key}
            style={{ marginBottom: 10, padding: 10, borderBottomWidth: 1 }}
            placeholder={field.key.charAt(0).toUpperCase() + field.key.slice(1)}
            value={field.value}
            onChangeText={text => handleInputChange(field.key, text)}
          />
        )
        )}
        <Button title="Add Post" onPress={() => handleAddPost(formFields)} disabled={(formFields.title.value && formFields.description.value) === ''} />
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        {/* Looping through posts and rendering post items */}
        {posts.slice(-10).map(item => renderItem(item))}
      </View>
    </View>
  );
}
