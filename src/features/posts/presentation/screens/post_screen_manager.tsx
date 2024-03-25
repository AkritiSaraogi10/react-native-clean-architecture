import {useEffect, useState} from 'react';
import AxiosOperations from '../../../../core/network/axios/axios_operations';
import PostService from '../../../../shared/local_data/collections/post/post_service';
import {PostRepositoryImpl} from '../../data/repository/post_repository_impl';
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import PostSchema from '../../../../shared/local_data/collections/post/post_schema';
import {
  BSON,
  CollectionChangeCallback,
  OrderedCollection,
  Results,
} from 'realm';
import {IPost} from '../../domain/entities/post_entity';
import {initialState} from '../interface/post_screen_fields';
import PostDto from '../../data/dto/post_dto';
import {IFields} from '../../../../core/types';
import {useSelector} from 'react-redux';
import {PostsUseCase} from '../../domain/usecases/get_post_usecase';

const postRealmService = PostService.getInstance();
const axiosOperations = new AxiosOperations();
const postDataAPIImp = new PostDataAPIImp(axiosOperations);
const postRepositoryImpl = new PostRepositoryImpl(
  postDataAPIImp,
  postRealmService,
);
const postUseCase = new PostsUseCase(postRepositoryImpl);

let listener: CollectionChangeCallback<PostSchema, [number, PostSchema]>;

// Custom hook to manage state and data for the post screen
const usePostScreenData = () => {
  const [posts, setPosts] = useState<IPost[]>([]); // State for storing posts
  const [editedPosts, setEditedPosts] = useState<IPost[]>([]);
  const internet = useSelector((state: any) => state.internet.isConnected);

  const [formFields, setFormFields] = useState<IFields[]>(initialState);
  const [editIndex, setEditIndex] = useState(NaN);

  useEffect(() => {
    let posts: Results<PostSchema>;

    listener = (collection: OrderedCollection<PostSchema>, changes: any) => {
      const posts: IPost[] = collection.map((item: any) => {
        return PostDto.fromJson(item);
      });
      console.log('changes', changes);
      setPosts(posts);
      setEditedPosts(posts);
    };

    const fetchData = async () => {
      posts = await postUseCase.getPosts();
      posts.removeAllListeners();
      posts.addListener(listener);
    };

    fetchData();

    return () => {
      if (posts) {
        posts.removeAllListeners();
      }
    };
  }, [internet]);

  const handleAddPost = (fields: IFields[]) => {
    const newPost = fields.reduce(
      (prev, curr) => {
        return {...prev, [curr.key]: curr.value};
      },
      {
        _id: new BSON.ObjectId(),
        userId: Math.random().toString(),
      },
    );
    postRepositoryImpl.addPost(newPost as PostSchema);
  };

  const handleEditOpen = (index: number) => {
    setEditIndex(index === editIndex ? NaN : index);
  };

  const handleEditChange = (id: string, changes: any) => {
    const postChanged = editedPosts.findIndex(p => p._id.toString() === id);
    const edited = {...editedPosts[postChanged], ...changes};
    const newPosts = [...editedPosts];
    newPosts[postChanged] = edited;
    setEditedPosts(newPosts);
  };

  const handleEditSave = (id: string) => {
    const postChanged = editedPosts.filter(p => p._id.toString() === id)[0];
    postUseCase.updatePost(postChanged as PostSchema);
  };

  const handleDeletePost = (id: string) =>
    postRepositoryImpl.deletePost(id ?? '');

  const handleInputChange2 = (key: number, value: string) => {
    setFormFields(prev => {
      const copy = [...prev];
      copy[key].value = value;
      return copy;
    });
  };

  return {
    posts,
    editedPosts,
    handleAddPost,
    handleDeletePost,
    formFields,
    setFormFields,
    handleInputChange2,
    isEdit: editIndex,
    handleEditOpen,
    handleEditSave,
    handleEditChange,
  };
};

export default usePostScreenData;
