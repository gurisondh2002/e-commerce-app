import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import { COLORS, SIZES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';


const RenderFavItem = ({ item}) => {

    const navigation = useNavigation()

    const deleteCartItem = async (favId) => {
        try {
            const response = await axios.delete(`http://192.168.29.2:3020/api/favourites/deleteFavItem/${favId}`);
            console.log(response.data);
            console.log("Deleted successfully");
        } catch (error) {
            console.error('Error deleting quantity:', error);
        }
    };

    const productHandler = () => {
        navigation.navigate("ProductDetails", { item: item.productInFav });
    };

    return (
        <TouchableOpacity onPress={productHandler}>
        <View style={styles.productItem} >
            <View key={item.productInFav._id} style={styles.divContainer}>
                <Image source={{ uri: item.productInFav.imageUrl }} style={styles.image} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{item.productInFav.title}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{item.productInFav.description}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={styles.price}>${item.productInFav.price}</Text>
                        <View style={styles.rating}>
                            <TouchableOpacity>
                                <MaterialIcons name="delete" size={24} color="grey" onPress={() => deleteCartItem(item._id)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    );
};

export default RenderFavItem;

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
