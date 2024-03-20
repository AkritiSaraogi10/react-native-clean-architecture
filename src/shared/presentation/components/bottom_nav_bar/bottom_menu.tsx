import React, { useState } from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { Button, Platform, Text, View } from "react-native";
import { TabBar } from "./bottom_tab_bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Carousel from "../carousel";
import Colors from "../../../../core/styles/app_colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomCard from "../custom_card";
import CustomAlert from "../custom_alert";
import CustomBottomSheetAlert from "../custom_bottomsheet_alert";
import CustomButton from "../custom_button";

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
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showBottomAlert, setShowBottomAlert] = useState<boolean>(false);

  const data = ['Slide 1', 'Slide 2', 'Slide 3'];
  const renderSliderContent = (content: string) => {
    return(
    <View style={{
      height: '100%',
      width: '100%',
      backgroundColor: Colors.whiteGray,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'row'
    }}>
      <View>
        <Text style={{color: Colors.black, fontSize: 17, fontWeight: '600'}}>Load details</Text>
        <View style={{height: 10}}/>
        <Text style={{color: Colors.black, fontSize: 21, fontWeight: '800'}}>10</Text>
        <Text style={{color: Colors.gray, fontSize: 13, fontWeight: '600'}}>of 24 Loads</Text>
      </View>
      <Icon name="circle-slice-5" size={130} color={Colors.greenColor}/>
    </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteGray, alignItems: 'center', justifyContent: 'flex-start' }}>
      <View style={{
        height: '8%', 
        width: '100%', 
        backgroundColor: Colors.whiteGray, 
        elevation: Platform.OS === 'android' ? 10 : 0, 
        alignItems: 'center', 
        justifyContent: 'center',
      }}>
        <Text style={{color: Colors.greenColor, fontSize: 15}}>App Bar</Text>
      </View>
      <Carousel data={data} renderSliderContent={renderSliderContent} />
      <View style={{width: '100%', marginTop: 15 , paddingHorizontal: 10}}>
        <CustomCard 
          title={'Feed'} 
          leftIcon={<Icon name="bag-personal-outline" size={35} color={Colors.greenColor}/>} 
          rightIcon={<Icon name="arrow-right-thin" size={30} color={Colors.greenColor}/>}
          onCardPress={()=>setShowAlert(true)}
        />
        <CustomCard 
          title={'Adjustments'} 
          leftIcon={<Icon name="view-list-outline" size={35} color={Colors.greenColor}/>} 
          rightIcon={<Icon name="arrow-right-thin" size={30} color={Colors.greenColor}/>}
          onCardPress={()=>setShowAlert(true)}
        />
        <CustomCard 
          title={'Reports'} 
          leftIcon={<Icon name="chart-timeline-variant-shimmer" size={35} color={Colors.greenColor}/>} 
          rightIcon={<Icon name="arrow-right-thin" size={30} color={Colors.greenColor}/>}
          onCardPress={()=>setShowBottomAlert(true)}
        />
      </View>
      <CustomAlert 
        icon={<Icon name="alert-outline" size={30} color={Colors.darkRed}/>} 
        title={"Deactive pen?"} 
        description={"Are you sure you want to deactivate pen?"} 
        prefixButtonText={"Cancel"} 
        suffixButtonText={"Save"} 
        handlePrefixButtonClick={() => setShowAlert(false)} 
        handleSuffixButtonClick={() => setShowAlert(false)} 
        visibility={showAlert} 
      />
      <CustomBottomSheetAlert 
        visibility={showBottomAlert} 
        title={"Please refresh data"} 
        description={"Do you want to refresh data? In case of isue please check your network."} 
        icon={<Icon name="apple-icloud" size={30} color={Colors.darkRed}/>}
        showButton={
          <CustomButton 
            title={"Refresh Data"} 
            height={50} 
            width={350} 
            icon={<Icon name='refresh' size={20} color={Colors.white} style={{paddingTop: 5}}/>}
            onPress={() => setShowBottomAlert(false)}          
          />
        } 
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
//Usage in App.tsx
{/* <SafeAreaProvider>
  <AppNav />
</SafeAreaProvider> */}