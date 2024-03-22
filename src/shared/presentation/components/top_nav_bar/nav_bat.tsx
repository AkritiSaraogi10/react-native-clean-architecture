import {StyleSheet, View, Image, Pressable} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const RightSideNaveIcons = ({rightIcon}: any) => {
  {
    /* profile icon and lang icon */
  }
  const navigation = useNavigation();
  return (
    <View style={[styles.row, {justifyContent: 'flex-end'}]}>
      {rightIcon.show == true && rightIcon.name ? (
        <IconButton
          icon={rightIcon.name}
          size={24}
          onPress={() => console.log('Pressed')}
        />
      ) : (
        <>
          {/* default icons on right */}
          {/* add icons insted of these images */}
          {/* <Pressable onPress={() => console.log('Pressed')}>
            <Image
              source={require('../assets/images/trailingicon2.png')}
              style={styles.profileLangIcon}></Image>
          </Pressable>
          <Pressable onPress={() => console.log('Pressed')}>
            <Image
              source={require('../assets/images/profile.png')}
              style={styles.profileLangIcon}></Image>
          </Pressable> */}
        </>
      )}
    </View>
  );
};

export const LeftSideNavIcons = ({leftIcon, title}: any) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.row,
        {
          justifyContent: 'space-between',
          height: 50,
        },
      ]}>
      <View style={styles.row}>
        {leftIcon.show == true && (
          <IconButton
            icon={leftIcon.name}
            size={24}
            onPress={() => navigation.goBack()}
          />
        )}
        <View style={{paddingLeft: leftIcon.show ? 0 : 16}}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </View>
  );
};

export const FixedNav = ({}) => {
  return (
    <View
      style={[
        styles.row,
        {
          marginHorizontal: 10,
          backgroundColor: 'white',
        },
      ]}>
      <View
        style={{
          paddingLeft: 16,
        }}>
        <Image
          source={require('../assets/images/sensors.png')}
          style={styles.connectivityIcon}></Image>
      </View>
      <View style={{paddingLeft: 10}}>
        <Image
          source={require('../assets/images/RFIDOn.png')}
          style={styles.connectivityIcon}></Image>
      </View>

      <View style={[styles.row, {paddingLeft: 20}]}>
        <Image
          source={require('../assets/images/autorenew.png')}
          style={styles.autorenew}></Image>

        <Text style={{fontSize: 12, paddingLeft: 4}}>
          Data as of Aug 05 • 6:05 AM
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectivityIcon: {width: 22, height: 22},
  autorenew: {width: 16, height: 16},
  title: {fontSize: 20, fontWeight: '500'},
  profileLangIcon: {width: 25, height: 25, marginHorizontal: 10},
});
