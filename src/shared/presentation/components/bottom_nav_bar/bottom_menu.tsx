import React, { useState } from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { Button, Text, View } from "react-native";
import { TabBar } from "./bottom_tab_bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import CustomCheckBox from "../custom_checkbox";
import CustomRadioButton from "../custom_radio_button";
import CustomCard from "../custom_card";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const EmptyScreen = () => {

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (newState: boolean) => {
    setIsChecked(newState);
  };
  const [isChecked1, setIsChecked1] = useState(false);

  const handleCheckChange = (checked: boolean) => {
    setIsChecked1(checked);
  };
  console.log(isChecked);
  console.log(isChecked1);
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ alignSelf: 'center', textAlignVertical: 'center' }}>Empty Screen 1</Text>
      <CustomCheckBox
        initialState={isChecked}
        onStateChange={handleCheckboxChange}
        color={'#4C6700'}
      />
      <CustomRadioButton
        checked={isChecked1}
        onCheckChange={handleCheckChange}
        color={'#4C6700'}
        uncheckedColor={'#ABABAB'}

      />
      <CustomCard title={"Ing Name"} belowContentTextColor={"#FFFFFF"}
        belowContentText="14 Run out Days"
        belowContentFillColor="#D8A300"
        subtitle={"On Hand - xx amount"}
        borderRadius={0}
        leftIcon={<MaterialIcon name="access-time" size={40} color={'#4C6700'} onPress={() => { }} />}
        belowContentIcon={<MaterialIcon name="access-time" size={18} color={'#FFFFFF'} />}
      />
      <CustomCard title={"Feeding"}
        leftIcon={<MaterialIcon name="access-time" size={40} color={'#4C6700'} onPress={() => { }} />}
        belowContentIcon={<MaterialIcon name="access-time" size={18} color={'#FFFFFF'} />}
        rightIcon={<MaterialIcon name="arrow-forward" size={28} color={'#4C6700'} />}
      />
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
          tabBarLabel: 'Home', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="home" size={24} color={color} />
          ),
        }} />
        <Tab.Screen name="Adjustments" component={EmptyScreen} options={{
          tabBarLabel: 'Adjustments', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="adjust" size={24} color={color} />
          ),
        }} />
        <Tab.Screen name="Feed" component={EmptyScreen} options={{
          tabBarLabel: 'Feed', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="feed" size={24} color={color} />
          ),
        }} />
        <Tab.Screen name="Settings" component={EmptyScreen} options={{
          tabBarLabel: 'Settings', headerShown: false, tabBarIcon: ({ color, size }) => (
            <MaterialIcon name="settings" size={24} color={color} />
          )
        }} />
      </Tab.Navigator>
    </View>
  );
};

function AppNav() {
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

export default AppNav;