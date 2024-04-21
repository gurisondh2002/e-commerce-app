import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import { COLORS, SIZES } from '../constants/theme';


const RenderOrder = ({ item }) => {

    const formatDeliveryDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate;
    };

    return (
        <View style={styles.productItem}>
            <View key={item._id} style={styles.divContainer}>
                <View style={styles.detailsContainer}>
                    <View style={styles.divRow}>
                    <Text style={styles.title}>Order ID: {item.orderId}</Text>
                    <Text style={[styles.deliveryStatus, { color: item.delivery_status === 'Delivered' ? COLORS.green : COLORS.red }]}>
                        {item.delivery_status}</Text>
                    </View>
                    <View style={styles.divRow}>
                    <Text style={styles.description}>Payment Method: {item.payment_method}</Text>
                    <Text style={styles.description}>{item.payment_status}</Text>
                    </View>
                    <Text style={styles.description1}>Delivery Date: {formatDeliveryDate(item.delivery_date)}</Text>
                    {/* <TouchableOpacity onPress={() => handleOrderDetails(item)}>
                        <Text style={styles.btnStyle}>View Details</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
};

export default RenderOrder;

const styles = StyleSheet.create({
    productItem: {
        padding: SIZES.small,
        marginTop: -10,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: SIZES.small,
        borderRadius: SIZES.small,
    },
    divContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.small,
        // marginBottom: 20,
        padding: 15
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    divRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: -10
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
    },
    rating: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 5,
        marginHorizontal: SIZES.large,
    },
    supplier: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        marginBottom: SIZES.small,
    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.medium
    },
    price1: {
        fontFamily: "regular",
        fontSize: SIZES.small
    },
    description: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        marginBottom: SIZES.small,
        color: COLORS.black
    },
    description1: {
        fontFamily: "bold",
        fontSize: SIZES.small,
        marginBottom: SIZES.small,
        color: COLORS.black
    },
    quantity: {
        fontSize: SIZES.small,
        fontWeight: 'bold'
    },
    subtotal: {
        fontSize: SIZES.small,
        fontWeight: 'bold'
    },
    total: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
        marginTop: 10,
        textAlign: 'center'
    },
    separator: {
        height: 16,
    },
});
