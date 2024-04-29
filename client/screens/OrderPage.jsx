import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useRoute } from '@react-navigation/native';

const OrderPage = ({item}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            <Text>Order ID: {item.orderId}</Text>
            <Text>Delivery Status: {item.delivery_status}</Text>
            <Text>Payment Method: {item.payment_method}</Text>
            <Text>Payment Status: {item.payment_status}</Text>
            <Text>Delivery Date: {item.delivery_date}</Text>
            {/* Add more order details as needordeed */}
        </View>
    );
};

export default OrderPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    title: {
        fontFamily: 'bold',
        fontSize: SIZES.h2,
        marginBottom: SIZES.margin,
    },
});
