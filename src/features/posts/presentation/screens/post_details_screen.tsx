import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useDeletePostByIdMutation, useGetPostByIdQuery, useUpdatePostByIdMutation } from "../../data/data_sources/post_data_api_impl_rtk";
import { RootStackParamList } from "../../../../core/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'PostDetailsScreen'>;

const PostDetailsScreen = ({ navigation, route }: DetailsScreenProps) => {
    const { postId } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { data: getPostById, isLoading: getPostByIdLoading, error: getPostByIdError } = useGetPostByIdQuery(postId);
    const [updatePost, { data: updatepost, isLoading, error }] = useUpdatePostByIdMutation();
    const [deletePostById, { isLoading: deleteByIdLoading, error: deleteByIdError, data: deleteByIdData }] = useDeletePostByIdMutation();


    useEffect(() => {
        if (getPostById) {
            setTitle(getPostById?.title);
            setBody(getPostById.body);
        }
    })

    const handleUpdate = () => {
        updatePost({ id: postId, body: { title, body } });
        setModalVisible(false)

    }

    const handleDeletePost = async () => {
        try {
            await deletePostById(postId);
            setModalVisible(false);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    useEffect(() => {
        if (updatepost) {
            console.log("Update successful:", updatepost);
            setModalVisible(false);
        }
        if (deleteByIdData) {
            console.log("Delete successful:", deleteByIdData);

        }
    }, [updatepost, deleteByIdData]);


    const PostUpdateModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={{ borderColor: 'blue', borderWidth: 2, margin: 2 }}
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Enter Title"
                            multiline
                        />
                        <TextInput
                            style={{ borderColor: 'blue', borderWidth: 2, margin: 2 }}
                            value={body}
                            onChangeText={setBody}
                            placeholder="Enter Body"
                            multiline
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleUpdate()}>
                            <Text style={styles.textStyle}> UPDATE</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        );
    }
    if (getPostByIdLoading) {
        return (<View>
            <ActivityIndicator size='large' style={{ alignSelf: "center" }} />
        </View>)
    }

    if (getPostByIdError) {
        return (<View>
            <Text> Error</Text>
        </View>)
    }

    return (
        <View style={{ padding: 10, }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18, color: 'blue' }} onPress={() => navigation.goBack()}> Back</Text>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>Post Details Screen</Text>
            </View>

            <Text style={{ color: 'black', fontSize: 15 }}>{getPostById?.title}</Text>
            <Text style={{ color: 'grey', fontSize: 12 }}>{getPostById?.body}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <Button onPress={() => setModalVisible(true)} title="Update" />
                <Button onPress={() => handleDeletePost()} title="Delete" />
            </View>
            <PostUpdateModal />
        </View>
    );




}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});
export default PostDetailsScreen;
