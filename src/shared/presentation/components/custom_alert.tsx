import { Modal, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../../core/styles/app_colors";
import Icon from 'react-native-vector-icons/EvilIcons';

interface ICustomAlert {
  icon: React.ReactNode,
  title : string,
  description: string,
  prefixButtonText: string,
  suffixButtonText: string,
  handlePrefixButtonClick: () => void;
  handleSuffixButtonClick: () => void;
  visibility: boolean,
}
const CustomAlert = ({
    icon,
    title,
    description,
    prefixButtonText,
    suffixButtonText,
    handlePrefixButtonClick,
    handleSuffixButtonClick,
    visibility,
  } : ICustomAlert) => {
    return (
      <View>
        <Modal
          visible={visibility}
          animationType={'fade'}
          transparent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                backgroundColor: 'white',
                height: 190,
                width: '90%',
                borderWidth: 1,
                borderColor: '#fff',
                borderRadius: 7,
                elevation: 10,
                paddingRight: 18,
              }}>
              <View style={{height: 120, alignItems: 'center', justifyContent: 'space-evenly'}}>
                {icon}
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>{title}</Text>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>{description}</Text>
              </View>
  
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handlePrefixButtonClick}
                  style={{
                    width: '20%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: Colors.darkGreen, fontSize: 15, fontWeight:'600' }}>{prefixButtonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={handleSuffixButtonClick}
                  style={{
                    width: '30%',
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: Colors.darkGreen,
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ color: Colors.darkGreen, fontSize: 15, fontWeight: '600', margin: 10 }}>{suffixButtonText}</Text>
                </TouchableOpacity>
              </View>  
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  export default CustomAlert;