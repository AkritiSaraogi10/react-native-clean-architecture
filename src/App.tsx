import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import PostScreen from './features/posts/presentation/screens/postScreen';
import Searchbar from './shared/presentation/components/search_bar';
import DatePicker from './shared/presentation/components/date_picker';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [searchtext, setSearchText] = useState('');
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <PostScreen />
      <Searchbar searchText={searchtext} setSearchText={setSearchText} />
      <DatePicker visibility={true} dates={{
        startDate: '',
        endDate: ''
      }} setVisibility={function (value: React.SetStateAction<boolean>): void {
        throw new Error('Function not implemented.');
      } } setDates={function (value: React.SetStateAction<{ startDate: string; endDate: string; }>): void {
        throw new Error('Function not implemented.');
      } } isRangeSelection={true} />
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