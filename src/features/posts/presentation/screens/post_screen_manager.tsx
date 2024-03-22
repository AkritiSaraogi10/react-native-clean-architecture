import {useEffect, useRef, useState} from 'react';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import {RealmContext} from '../../../../shared/local_data/realm_config';
import PostService from '../../../../shared/local_data/collections/post/post_service';
import {PostRepositoryImpl} from '../../data/repository/post_repository_impl';
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';
import {BSON, OrderedCollection} from 'realm';
import {handleInternetAvailability} from '../../../../core/utils/selector';
import {IPost} from '../../domain/entities/post_entity';
import {initialState} from '../interface/post_screen_fields';
import PostDto from '../../data/dto/post_dto';
import {IFields} from '../../../../core/types';
import {useSelector} from 'react-redux';

const postRealmService = PostService.getInstance();
const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(
  postDataAPIImp,
  postRealmService,
);
const {useRealm} = RealmContext;
let service: PostService | PostRepositoryImpl = postRealmService;
// Custom hook to manage state and data for the post screen
const usePostScreenData = () => {
  const [posts, setPosts] = useState<IPost[]>([]); // State for storing posts
  const realm = useRealm(); // Accessing Realm context and listener from RealmContext
  const internet = useSelector((state: any) => state.internet.isConnected);

  const [formFields2, setFormFields2] = useState<IFields[]>(initialState);
  const [editIndex, setEditIndex] = useState(NaN);

  useEffect(() => {
    service = handleInternetAvailability({
      apiServiceInstance: postRepositoryImpl,
      realmServiceInstance: postRealmService,
    });
  }, [internet]);

  useEffect(() => {
    const listener = (
      collection: OrderedCollection<PostSchema>,
      changes: any,
    ) => {
      const posts: IPost[] = collection.map((item: any) => {
        return PostDto.fromJson(item);
      });
      console.log('changes', changes);
      setPosts(posts);
    };

    // internet service should not expect the listener.
    // this should be addressed
    const fetchData = async () => {
      try {
        // if the service is realm or api
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
    return () => {
      realm.removeAllListeners();
    };
  }, []);

  const handleAddPost = (fields: IFields[]) => {
    const newp = fields.reduce(
      (prev, curr) => {
        return {...prev, [curr.key]: curr.value};
      },
      {
        _id: new BSON.ObjectId(),
        userId: Math.random().toString(),
      },
    );
    console.log(newp);
    service.addPost(newp as PostSchema);
  };

  const handleEditOpen = (index: number) => {
    setEditIndex(index === editIndex ? NaN : index);
  };

  const handleEditChange = (id: string, changes: any) => {
    const postChanged = posts.findIndex(p => p._id.toString() === id);
    const edited = {...posts[postChanged], ...changes};
    const newPosts = [...posts];
    newPosts[postChanged] = edited;
    setPosts(newPosts);
  };

  const handleEditSave = (id: string) => {
    const postChanged = posts.filter(p => p._id.toString() === id)[0];
    service.updatePost(postChanged);
  };

  const handleDeletePost = (id: string) => service.deletePost(id ?? '');

  const handleInputChange2 = (key: number, value: string) => {
    setFormFields2(prev => {
      const copy = [...prev];
      copy[key].value = value;
      return copy;
    });
  };

  return {
    posts,
    handleAddPost,
    handleDeletePost,
    formFields2,
    setFormFields2,
    handleInputChange2,
    isEdit: editIndex,
    handleEditOpen,
    handleEditSave,
    handleEditChange,
  };
};

export default usePostScreenData;
