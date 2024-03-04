import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../auth/userContext'
import axios from 'axios'

const ProductCard = ({ item, onCountChange }) => {

    const { userData } = useUser();

    const userId = userData.userId;

    const navigation = useNavigation();
    const [count, setCount] = useState(0)

    const productHandler = () => {
        navigation.navigate("ProductDetails", { item })
    }

    const handleAddItemToCart = async () => {
        try {
            const res = await axios.post('http://192.168.5.60:3000/api/carts/',{
                userId: userId,
                cartItem: item.cartItem,
                quantity: item.quantity,
              });
            setCount(count + 1);
            onCountChange(count + 1);
            console.log('Item added to cart successfully');
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };
    return (
        <TouchableOpacity onPress={productHandler}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                </View>

                <View style={styles.detials}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                    </Text>

                    <Text style={styles.supplier} numberOfLines={1}>
                        {item.supplier}
                    </Text>
                    <Text style={styles.price} numberOfLines={1}>
                        ${item.price}
                    </Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add-circle" size={30} color="black" onPress={handleAddItemToCart} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    mainContainer: {
        width: 182,
        height: 215,
        marginEnd: 10,
        borderRadius: SIZES.medium,
        backgroundColor: COLORS.secondary,
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginLeft: SIZES.small / 2,
        marginTop: SIZES.small / 2,
        borderRadius: SIZES.small,
        overflow: "hidden",
    },
    image: {
        aspectRatio: 1,
        resizeMode: "cover",
    },
    detials: {
        padding: SIZES.xSmall,
    },
    title: {
        fontFamily: "bold",
        fontSize: SIZES.large,
        marginBottom: 1,
    },
    supplier: {
        fontFamily: "regular",
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    price: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
        // marginBottom:2
    },
    addBtn: {
        position: "absolute",
        bottom: SIZES.xSmall,
        right: SIZES.xSmall
    }
})