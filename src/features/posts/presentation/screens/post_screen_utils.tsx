import { useEffect, useState } from "react";
import AxiosOperations from "../../../../core/network/axios/axios_operations";
import { RealmContext } from "../../../../shared/local_data/realm_config";
import UserService from "../../../../shared/local_data/collections/user/user_service";
import { PostRepositoryImpl } from "../../data/repository/post_repository_impl";
import PostDataAPIImp from '../../data/data_sources/post_data_api_impl';
import UserSchema from "../../../../shared/local_data/collections/user/user_schema";
import { BSON, OrderedCollection, Results } from "realm";
import { handleInternetAvailability } from "./selector";
import { IPost } from "../../domain/entities/post_entity";

const usePostScreenData = () => {
  const axiosOperations = new AxiosOperations();
  const postDataAPIImp = new PostDataAPIImp(axiosOperations);
  const postRepositoryImpl = new PostRepositoryImpl(postDataAPIImp);
  const userService = UserService.getInstance();
  const { useRealm } = RealmContext;

  const [users, setUsers] = useState<IPost[]>([]);
  const realm = useRealm();

  const service = handleInternetAvailability({forInternet: postRepositoryImpl, forNoInternet: userService});

  useEffect(()=>{
   const fetchData = async () => {
      const collection = await service.getPosts((collection: OrderedCollection<UserSchema>) => {
          console.log('REALM DATA  :',  collection);
        });
      setUsers(collection);
    }
    fetchData();
  }, [realm]);

   const handleButtonClick = () => {
    const newUser = {
      _id: new BSON.ObjectId(),
      title: 'New Title',
      userId: '4',
      body: 'This is a new user added using the button',
    } as UserSchema;

        userService.addUserToRealm(newUser);
  };

  const handleDeleteUser = (id: string) => userService.deleteUserFromRealm(id ?? '');

  return { users, handleButtonClick, handleDeleteUser };
};

export default usePostScreenData;
