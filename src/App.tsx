import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import PostScreen from './features/posts/presentation/screens/postScreen';
import Carousel from './shared/presentation/components/carousel';
import CustomAlert from './shared/presentation/components/custom_alert';
import Icon from 'react-native-vector-icons/EvilIcons';
import CustomButton from './shared/presentation/components/custom_button';
import CustomBottomSheetAlert from './shared/presentation/components/custom_bottomsheet_alert';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Sliderdata = [
  'Slide 1',
  'Slide 2',
  'Slide 3',
  'Slide 4',
  'Slide 5',
  'Slide 6',
  ]
  const renderCustomSliderContent = (content: string) => (
    <View style={{ backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text style={{color: Colors.white}}>{content}</Text>
    </View>
  );

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showBottomAlert, setBottomAlert] = useState<boolean>(false);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <PostScreen />
      <Carousel data={Sliderdata} renderSliderContent={renderCustomSliderContent } />
      <View style={{ height: 20 }} />
      <View style={{alignItems: 'center'}}>
      <CustomButton 
        icon={<Icon name="refresh" size={27} color={Colors.white} />}
        title={"Refresh Data"} 
        height={50} 
        width={350} 
        onPress={() => setBottomAlert(true)} 
      />
      <View style={{ height: 20 }} />
      <CustomButton 
        icon={<Icon name="refresh" size={27} color={Colors.darkGreen} />}
        title={"Show Alert"} 
        height={50} 
        width={350} 
        onPress={() => setShowAlert(true)} 
        mode={'outlined'}
      />
      <View style={{ height: 20 }} />
      <CustomButton 
        icon={<Icon name="arrow-right" size={27} color={Colors.darkGreen} />}
        title={"Show Bottom Alert"} 
        height={50} 
        width={350} 
        onPress={() => setBottomAlert(true)} 
        mode={'text'}
      />
      </View>

      <CustomAlert 
        icon={<Icon name={'exclamation'} size={35} color={Colors.brickRed} />}
        title='Unsaved Changes'
        description='Are you sure you want to discard the changes?'
        prefixButtonText='Save'
        suffixButtonText='Discard'
        handlePrefixButtonClick={() => setShowAlert(false)}
        handleSuffixButtonClick={() => setShowAlert(false)}
        visibility={showAlert}
      />
      <CustomBottomSheetAlert 
        visibility={showBottomAlert} 
        title='Please refresh data' 
        description='In case of any issues, please check your network or contact your manager' 
        icon={<Icon name="sc-soundcloud" size={40} color={Colors.darkRed} />} 
        showButton={
          <CustomButton 
            icon={<Icon name="refresh" size={27} color={Colors.white} />}
            title={"Please refresh data"} 
            height={45} 
            width={350} 
            onPress={()=> setBottomAlert(false)} 
        />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
