import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from '../features/posts/presentation/screens/post_screen';
import PostDetailsScreen from '../features/posts/presentation/screens/post_details_screen';
import AddPostScreen from '../features/posts/presentation/screens/add_posts_screen';
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PostScreen">
                <Stack.Screen name="PostScreen" options={{ headerShown: false }} component={PostScreen} />
                <Stack.Screen name="PostDetailsScreen" options={{ headerShown: false }} component={PostDetailsScreen} />
                <Stack.Screen name="AddPostScreen" options={{ headerShown: false }} component={AddPostScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;

export type RootStackParamList = {
    PostScreen: undefined;
    PostDetailsScreen: { postId: string };
    AddPostScreen: undefined

};
