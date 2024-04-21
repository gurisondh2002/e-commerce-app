import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import Order from '../assets/gifwbg.gif'

const OrderComplete = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={Order} style={styles.image} />
            <Text style={styles.message}>Order Placed Successfully!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Continue Shopping</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontFamily: 'semibold',
        fontSize: SIZES.large,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        fontFamily: 'semibold',
        fontSize: SIZES.medium,
        color: COLORS.white,
    },
});

export default OrderComplete;
