import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomCardProps {
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
    belowContentFillColor = 'red',
    belowContentIcon,
    belowContentText,
    belowContentTextColor
}: CustomCardProps) => {
    const titleStyle = subtitle ? styles.titleWithSubtitle : styles.titleWithoutSubtitle;
    return (
        <View style={[styles.viewContainer, { borderRadius: borderRadius }]}>
            <TouchableOpacity onPress={onCardPress}>
                <View style={{ flexDirection: 'row' }}>
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
                        <View style={styles.leftIconContainer}>
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
    titleWithSubtitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'left',
        color: '#464646'
    },
    titleWithoutSubtitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlignVertical: 'center',
        textAlign: 'left',
        justifyContent: 'center',
        verticalAlign: 'middle',
        color: '#464646'
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
    viewContainer: {
        borderColor: '#D7D7D7',
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: '#E5E5E5',
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
        color: '#464646',
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
    belowContentTextWrapper: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    belowContentText: {
        fontSize: 14,
        fontWeight: '700'
    },
});

export default CustomCard;
