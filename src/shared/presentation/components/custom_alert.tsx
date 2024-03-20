import { Modal, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Colors from "../../../core/styles/app_colors";

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
              <Text style={{ fontSize: 20, fontWeight: '600', color: 'black' }}>{title}</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{description}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handlePrefixButtonClick}
                style={styles.prefixButton}
              >
                <Text style={styles.buttonText}>{prefixButtonText}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSuffixButtonClick}
                style={styles.suffixButton}
              >
                <Text style={[styles.buttonText, { margin: 10 }]}>{suffixButtonText}</Text>
              </TouchableOpacity>
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
    alignItems: 'flex-end',
    backgroundColor: 'white',
    height: 190,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 7,
    elevation: 10,
    paddingRight: 18,
  },
  contentContainer: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
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