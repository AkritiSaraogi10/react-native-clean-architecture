import {useEffect, useState} from 'react';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import {RealmContext} from '../../../../shared/local_data/realm_config';
import PostService from '../../../../shared/local_data/collections/post/post_service';
import {PostRepositoryImpl} from '../../data/repository/post_repository_impl';
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';
import {BSON, OrderedCollection, Results} from 'realm'; // Importing Realm-related utilities
import {handleInternetAvailability} from '../../../../core/utils/selector';
import {IPost} from '../../domain/entities/post_entity';
import {
  IFields,
  IPostScreenFieldsData,
  initialState,
  postScreenFields,
} from '../interface/post_screen_fields';
import PostDto from '../../data/dto/post_dto';

const postService = PostService.getInstance();
const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(postDataAPIImp, postService);
const {useRealm} = RealmContext;

const service = handleInternetAvailability({
  apiServiceInstance: postRepositoryImpl,
  realmServiceInstance: postService,
});

// Custom hook to manage state and data for the post screen
const usePostScreenData = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  //   const [formFields, setFormFields] =
  //     useState<IPostScreenFieldsData>(postScreenFields);
  const [formFields2, setFormFields2] = useState<IFields[]>(initialState);
  const realm = useRealm(); // Accessing Realm context and listener from RealmContext

  useEffect(() => {
    // Effect to fetch posts and set up a listener for changes in Realm
    const listener = (collection: OrderedCollection<PostSchema>) => {
      const posts: IPost[] = collection.map((item: any) => {
        // Mapping Realm objects to IPost entities and storing in local posts state
        return PostDto.fromJson(item);
      });
      setPosts(posts);
    };

    // internet service should not expect the listener.
    // this should be addressed
    const fetchData = async () => {
      try {
        if (service instanceof PostService) {
          await service.getPosts(listener);
        } else {
          const data = await service.getPosts();
          setPosts(data);
        }
      } catch (e) {
        console.log('error', e);
      }
    };
    fetchData();
    // very important to remove listeners
    return () => {
      realm.removeAllListeners();
    };
  }, [realm]); // Effect runs when realm context changes happens

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

  const handleDeletePost = (id: string) => service.deletePost(id ?? '');

  const handleInputChange = (key: string, value: string) => {
    setFormFields(prev => {
      return {
        ...prev,
        [key]: {
          ...prev[key as keyof IPostScreenFieldsData],
          value: value,
        },
      };
    });
  };

  const handleInputChange2 = (key: number, value: string) => {
    setFormFields2(prev => {
      const copy = [...prev];
      copy[key].value = value;
      return copy;
    });
  };

  return {
    posts,
    // formFields,
    handleAddPost,
    handleDeletePost,
    handleInputChange,
    formFields2,
    setFormFields2,
    handleInputChange2,
  };
};

export default usePostScreenData;
