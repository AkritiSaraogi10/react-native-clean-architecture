import { useEffect, useState } from "react";
import AxiosOperations from "../../../../core/network/axios/axios_operations";
import { RealmContext } from "../../../../shared/local_data/realm_config";
import PostService from "../../../../shared/local_data/collections/post/post_service";
import { PostRepositoryImpl } from "../../data/repository/post_repository_impl";
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import PostSchema from "../../../../shared/local_data/collections/post/post_schema";
import { BSON, OrderedCollection, Results } from "realm";   // Importing Realm-related utilities
import { handleInternetAvailability } from "../../../../core/utils/selector";
import { IPost } from "../../domain/entities/post_entity";
import { IPostScreenFieldsData, postScreenFields } from "../interface/post_screen_fields";
import PostDto from "../../data/dto/post_dto";

// Instantiate necessary objects and services
const postService = PostService.getInstance();
const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(postDataAPIImp, postService);
const { useRealm } = RealmContext;

// Providing Internet and Realm services instance to handling data availability which returns one instance based on Internet Availability
const service = handleInternetAvailability({apiServiceInstance: postRepositoryImpl, realmServiceInstance: postService});

// Custom hook to manage state and data for the post screen
const usePostScreenData = () => {
  const [posts, setPosts] = useState<IPost[]>([]);  // State for storing posts
  const [formFields, setFormFields] = useState<IPostScreenFieldsData>(postScreenFields);  // State for formfields
  const realm = useRealm();  // Accessing Realm context and listener from RealmContext

  useEffect(() => {
    // Effect to fetch posts and set up a listener for changes in Realm
    const listener = (collection: OrderedCollection<PostSchema>) => {
      const posts: IPost[] = collection.map((item: any) => {
        // Mapping Realm objects to IPost entities and storing in local posts state
        return PostDto.fromJson(item);
      });
      setPosts(posts);
    };

    const fetchData = async () => {
      try {
        const data = await service.getPosts(listener);
        setPosts(data);
      } catch(e){
        console.log('error', e);
      }
      
    };
    fetchData();
    return () => {};
  }, [realm]);  // Effect runs when realm context changes happens

    // Function to handle adding a new post
   const handleAddPost = (fields: IPostScreenFieldsData) => {
    //creating payload to pass for API and RealmDB call
    const newPost = {
      _id: new BSON.ObjectId(),
      title: fields.title.value,
      userId: Math.random().toString(),
      body: fields.description.value,
    } as PostSchema;

    //Making add post call
    service.addPost(newPost);
  };

  // Function to handle deleting a post
  const handleDeletePost = (id: string) => service.deletePost(id ?? '');

  // Function to handle input change in the form fields
  const handleInputChange = (key: string, value: string) => {
    //Whatever field will be changed its value will be updated in that keyField
    setFormFields((prev) => {
      return {
        ...prev,
        [key]: {
          ...prev[key as keyof IPostScreenFieldsData],
          value: value,
        },
      };
    });
  };

  // Returning state variables and functions as an object
  return { posts, formFields, handleAddPost, handleDeletePost, handleInputChange };
};

export default usePostScreenData;
