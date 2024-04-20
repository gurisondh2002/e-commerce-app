import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native';


const RenderProductItem = ({ item }) => {
    console.log("Rendering cart item:", item);

    const increment = async (productId) => {
        try {
            const response = await axios.post(`http://192.168.29.2:3020/api/carts/incCartItemQuantity/${userId}`, { productInCart: productId });
            console.log(response.data);
            console.log("Increment successfully");
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    }

    const decrement = async (productId) => {
        try {
            const response = await axios.post(`http://192.168.29.2:3020/api/carts/decCartItemQuantity/${userId}`, { productInCart: productId });
            console.log(response.data);
            console.log("Decrement successfully");
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };

    const deleteCartItem = async (cartId) => {
        try {
            const response = await axios.delete(`http://192.168.29.2:3020/api/carts/deleteCartItem/${cartId}`);
            console.log(response.data);
            console.log("Deleted successfully");
        } catch (error) {
            console.error('Error deleting quantity:', error);
        }
    };

    return (
        <View style={styles.productItem}>
            <View key={item.productInCart._id} style={styles.divContainer}>
                <Image source={{ uri: item.productInCart.imageUrl }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.productInCart.title}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{item.productInCart.description}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.price}>${item.productInCart.price}</Text>
                        <View style={styles.rating}>
                            <TouchableOpacity>
                                <SimpleLineIcons name="plus" size={20} color="grey" onPress={() => increment(item.productInCart._id)} />
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <TouchableOpacity>
                                <SimpleLineIcons name="minus" size={20} color="grey" onPress={() => decrement(item.productInCart._id)} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <MaterialIcons name="delete" size={24} color="grey" onPress={() => deleteCartItem(item._id)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.price1}>Subtotal: {item.subtotal}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RenderProductItem;

const styles = StyleSheet.create({
    productItem: {
        padding: SIZES.small,
        marginTop:-10,
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
        padding: 5
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop:-10
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
        fontFamily: "bold",
        fontSize: SIZES.small,
        marginBottom: SIZES.small,
        color: COLORS.gray
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
