import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Colors from "../../../core/styles/app_colors";
import CustomButton from "./custom_button";

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
        <View style={styles.modalContainer}>
          <View style={styles.alertContainer}>
            <View style={styles.contentContainer}>
              {icon}
              <View style={{height: 5}}></View>
              <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>{title}</Text>
              <View style={{height: 3}}></View>
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton 
                title={prefixButtonText} 
                onPress={handlePrefixButtonClick}
                mode='text'
                width={'30%'}
              />
              <CustomButton 
                title={suffixButtonText} 
                onPress={handleSuffixButtonClick}
                mode='outlined'
                width={'30%'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CustomAlert;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
    elevation: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  prefixButton: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginRight: 10,
  },
  suffixButton: {
    width: '30%',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.darkGreen,
    marginBottom: 10,
  },
  buttonText: {
    color: Colors.darkGreen,
    fontSize: 15,
    fontWeight: '600',
  },
});