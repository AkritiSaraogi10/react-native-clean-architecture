/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Button, TextInput, FlatList} from 'react-native';
import usePostScreenData from './post_screen_manager';
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';

export default function PostScreen() {
  const {
    posts,
    editedPosts,
    handleAddPost,
    handleDeletePost,
    formFields,
    handleInputChange,
    isEdit,
    handleEditOpen,
    handleEditSave,
    handleEditChange,
  } = usePostScreenData(); // custom hooks

  const renderItem = (item: PostSchema, index: number) => {
    return (
      <View key={item?._id?.toString()}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            padding: 4,
            marginBottom: 8,
            backgroundColor: '#E1DFDD',
          }}>
          <Text style={{flexBasis: '70%'}}>{item.title}</Text>

          <Button title="Edit" onPress={() => handleEditOpen(index)} />

          <Button
            title="Delete"
            onPress={() => handleDeletePost(item?._id?.toString())}
          />
        </View>

        {isEdit === index && (
          <View>
            <TextInput
              style={{marginBottom: 10, padding: 10, borderBottomWidth: 1}}
              value={editedPosts[index]?.title}
              onChangeText={text =>
                handleEditChange(item._id.toString(), {title: text})
              }
            />
            <Button
              title="Save"
              onPress={() => handleEditSave(item._id.toString())}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 16, alignSelf: 'center'}}>
        Post Screen
      </Text>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        {formFields.map((field, index) => (
          <TextInput
            key={field.key}
            style={{marginBottom: 10, padding: 10, borderBottomWidth: 1}}
            placeholder={field.key.charAt(0).toUpperCase() + field.key.slice(1)}
            value={field.value}
            onChangeText={text => handleInputChange(index, text)}
          />
        ))}
        <Button title="Add Post" onPress={() => handleAddPost(formFields)} />
      </View>

      <FlatList
        data={posts}
        renderItem={p => {
          return renderItem(p.item, p.index);
        }}
        style={{padding: 10}}
      />
    </View>
  );
}
