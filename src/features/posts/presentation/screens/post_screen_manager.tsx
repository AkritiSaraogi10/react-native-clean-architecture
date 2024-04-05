import {useEffect, useState} from 'react';
import PostSchema from '../../../../core/local_DB/collections/post/post_schema';
import {BSON, OrderedCollection, Results} from 'realm';
import {initialState} from '../interface/post_screen_fields';
import {IFields} from '../../../../core/types';
import {useSelector} from 'react-redux';
import {PostsUseCase} from '../../domain/usecases/get_post_usecase';
import {container} from 'tsyringe';

const postUseCase = container.resolve(PostsUseCase); // DI container

const usePostScreenData = () => {
  const [posts, setPosts] = useState<PostSchema[]>([]);
  const [editedPosts, setEditedPosts] = useState<PostSchema[]>([]);
  const internet = useSelector((state: any) => state.internet.isConnected);

  const [formFields, setFormFields] = useState<IFields[]>(initialState);
  const [editIndex, setEditIndex] = useState<string | null>(null);

  useEffect(() => {
    let posts: Results<PostSchema>;
    let listener = (collection: OrderedCollection<PostSchema>) => {
      setPosts(Array.from(collection.sorted('createdAt', true)));
      setEditedPosts(Array.from(collection));
    };

    const fetchData = async () => {
      try {
        posts = await postUseCase.getPosts();
        posts.removeAllListeners();
        posts.addListener(listener);
      } catch (error: any) {
        // set failure toasts here
        console.log(error.message, error.errorCode);
      }
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
        _id: new BSON.UUID(),
        userId: Math.random().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: 'A6B783D3952524CFD8E4F11701DF3363',
      },
    );
    const newPost1 = PostSchema.fromJSON(newPost);
    try {
      postUseCase.addPost(newPost1);
    } catch (error: any) {
      console.log(error.message, error.errorCode);
    }
  };

  const handleEditOpen = (id: string) => {
    setEditIndex(id === editIndex ? null : id);
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
    postChanged.updatedAt = new Date();
    try {
      postUseCase.updatePost({
        ...postChanged,
      } as PostSchema);
      setEditIndex(null);
    } catch (error: any) {
      console.log(error.message, error.errorCode);
    }
  };

  const handleDeletePost = (id: string) => {
    try {
      postUseCase.deletePost(id ?? '');
    } catch (error: any) {
      console.log(error.message, error.errorCode);
    }
  };

  const handleInputChange = (key: number, value: string) => {
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
    handleInputChange,
    isEdit: editIndex,
    handleEditOpen,
    handleEditSave,
    handleEditChange,
  };
};

export default usePostScreenData;
