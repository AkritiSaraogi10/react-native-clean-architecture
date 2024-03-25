import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Colors from '../../../core/styles/app_colors';
interface ICustomAvatarProps {
    imageName: any;
    imageSize: number;
    iconName?: string;
}
const CustomAvatar = ({ imageName, imageSize, iconName }: ICustomAvatarProps) => {
    const iconSize = imageSize * 0.4;
    const iconOffset = iconSize * 0.3;

    return (
        <View style={{
            width: imageSize,
            height: imageSize,
            alignItems: 'center',
        }}>
            <View style={styles.viewStyle}>
                <Image
                    source={imageName}
                    style={[
                        styles.imageStyle,
                        { borderRadius: imageSize / 2 }]}
                />
                {iconName && (<TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: -iconOffset,
                        right: -iconOffset,
                    }}
                    onPress={() => { }} >
                    <IconButton
                        icon={iconName}
                        size={iconSize / 1.5}
                        iconColor={Colors.greenColor}
                        style={{
                            width: iconSize,
                            height: iconSize,
                            borderRadius: iconSize / 2,
                            backgroundColor: Colors.white,
                        }}
                    />
                </TouchableOpacity>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewStyle: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    }

});

export default CustomAvatar;