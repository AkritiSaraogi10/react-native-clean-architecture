import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../core/styles/app_colors';

interface ICustomCardProps {
    title: string;
    subtitle?: string;
    leftIcon: React.ReactNode;
    rightIcon?: React.ReactNode;
    borderRadius?: number;
    onCardPress?: () => void;
    belowContentText?: string;
    belowContentTextColor?: string;
    belowContentFillColor?: string;
    belowContentIcon?: React.ReactNode;
}

const CustomCard = ({
    title,
    subtitle,
    leftIcon,
    rightIcon,
    borderRadius = 12,
    onCardPress,
    belowContentFillColor = Colors.yellowColor,
    belowContentIcon,
    belowContentText,
    belowContentTextColor = Colors.white
}: ICustomCardProps) => {
    const titleStyle = subtitle ? styles.titleWithSubtitle : styles.titleWithoutSubtitle;
    return (
        <View style={[styles.viewContainer, { borderRadius: borderRadius }]}>
            <TouchableOpacity onPress={onCardPress}>
                <View style={styles.viewStyle}>
                    <View style={styles.leftIconContainer}>
                        {leftIcon}
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={[titleStyle, !subtitle && styles.centeredTitle]}>{title}</Text>
                        {subtitle && <Text style={styles.subtitleStyle}>{subtitle}</Text>}
                    </View>
                    {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
                </View>
            </TouchableOpacity>
            {belowContentText && (
                <View>
                    <View style={[styles.belowContentContainer, { backgroundColor: belowContentFillColor }]}>
                        <View style={styles.belowLeftIconContainer}>
                            {belowContentIcon}
                        </View>
                        <Text style={[styles.belowContentText, { color: belowContentTextColor }]}>
                            {belowContentText}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row'
    },
    titleWithSubtitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'left',
        color: Colors.titleColor
    },
    titleWithoutSubtitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlignVertical: 'center',
        textAlign: 'left',
        justifyContent: 'center',
        verticalAlign: 'middle',
        color: Colors.titleColor
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    leftIconContainer: {
        marginRight: 10,
        justifyContent: 'center',
    },
    belowLeftIconContainer: {
        marginRight: 2,
        justifyContent: 'center',
    },
    viewContainer: {
        borderColor: Colors.cardBorderColors,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: Colors.backgroundColor,
        marginBottom: 10,
        padding: 10
    },
    rightIconContainer: {
        marginLeft: 'auto',
        justifyContent: 'center',
    },
    subtitleStyle: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '700',
        color: Colors.titleColor,
        textAlignVertical: 'auto',
    },
    centeredTitle: {
        textAlignVertical: 'center',
        textAlign: 'left',
        justifyContent: 'center',
        verticalAlign: 'middle'
    },
    belowContentContainer: {
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 12,
        alignSelf: 'flex-start',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 2,
        paddingBottom: 2
    },
    belowContentText: {
        fontSize: 14,
        fontWeight: '700'
    },
});

export default CustomCard;
