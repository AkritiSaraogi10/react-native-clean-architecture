import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../../../core/navigation";
import { useAddPostMutation } from "../../data/data_sources/post_data_api_impl_rtk";

type Props = NativeStackScreenProps<RootStackParamList, 'AddPostScreen'>;
const AddPostScreen = ({ navigation }: Props) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isEnable, setEnable] = useState(false);
    const [addPost, { isLoading, data }] = useAddPostMutation();

    useEffect(() => {
        if (title !== "" && body !== "") {
            setEnable(true);
        } else {
            setEnable(false);
        }
    }, [title, body]);


    const handleAddPost = () => {
        addPost({ title, body });
        setTitle("");
        setBody("");
    }

    useEffect(() => {
        if (data) {
            console.log("Mutation Result---> ", data);
        }
    }, [data, navigation]);

    return (
        <View style={{ padding: 10 }}>

            <View style={{ justifyContent: "space-between", flexDirection: 'row' }}>

                <Text style={{ fontSize: 18, color: 'blue' }} onPress={() => { navigation.goBack() }}>
                    Back</Text>
                <Text style={{ textAlign: 'center', fontSize: 18 }}>Add Posts Screen</Text>
            </View>
            <TextInput style=
                {{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }} placeholder="Add Title"
                value={title} onChangeText={setTitle} />
            <TextInput style=
                {{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }} placeholder="Add Body"
                value={body} onChangeText={setBody} />

            <Button
                disabled={!isEnable}
                onPress={() => handleAddPost()}
                title={!isLoading ? "Add Post" : "Adding..."}
                color="blue"
            />
        </View>)

}
export default AddPostScreen;