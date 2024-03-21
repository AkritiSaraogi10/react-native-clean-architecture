import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { Button, Text, View } from "react-native";
import { TabBar } from "./bottom_tab_bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { AppStrings } from "../../../../core/exports";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const EmptyScreen = () => {
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ alignSelf: 'center', textAlignVertical: 'center' }}>Empty Screen 1</Text>
    </View>
  );
}

const EmptyScreen2 = () => {
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ alignSelf: 'center', textAlignVertical: 'center' }}>Empty Screen 2</Text>
    </View>
  );
}
type HomeProps = {
  navigation: any;
}

function HomeScreens({ navigation }: HomeProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="HomeScreen 1"
        onPress={() => navigation.navigate('HomeScreen 1')}
      />
      <Button
        title="HomeScreen 2"
        onPress={() => navigation.navigate('HomeScreen 2')}
      />
    </View>
  );
}

function HomeTabs() {
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator backBehavior="history"
        tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreens} options={{
          tabBarLabel: AppStrings.home, headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="home" size={24} color={color} />
          ),
        }} />
        <Tab.Screen name="Adjustments" component={EmptyScreen} options={{
          tabBarLabel: AppStrings.adjustments, headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="adjust" size={24} color={color} />
          ),
        }} />
        <Tab.Screen name="Feed" component={EmptyScreen} options={{
          tabBarLabel: AppStrings.feed, headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="feed" size={24} color={color} />
          ),
        }} />
        <Tab.Screen name="Settings" component={EmptyScreen} options={{
          tabBarLabel: AppStrings.settings, headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcon name="settings" size={24} color={color} />
          )
        }} />
      </Tab.Navigator>
    </View>
  );
};

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainHomeScreen" options={{ headerShown: false }} component={HomeTabs} />
        <Stack.Screen name="HomeScreen 1" options={{ headerShown: false }} component={EmptyScreen2} />
        <Stack.Screen name="HomeScreen 2" options={{ headerShown: false }} component={EmptyScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;