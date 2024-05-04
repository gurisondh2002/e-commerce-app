import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../constants/theme';
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useUser } from '../auth/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductCard = ({ item, updateCartCount, updateCartIconColor}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState('');

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchStoredUserData();
    }
  }, [isFocused]);

  const fetchStoredUserData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      console.log("Stored Id ===> ", storedId)
      if (storedId) {
        console.log("Was in setId")
        setId(storedId)
        return storedId
      } else {
        setId('')
      }
    } catch (error) {
      console.error('Error fetching stored user data:', error);
    }
  };

  const navigation = useNavigation();

  const productHandler = () => {
    navigation.navigate("ProductDetails", { item })
  };

  const handleAddItemToCart = async (prodId) => {
    try {
      const res = await axios.post(`http://192.168.29.2:3020/api/carts/addToCart/${id}`, {
       productInCart: prodId
      });
      console.log('Item added to cart successfully');
      const newCartCount = await axios.get(`http://192.168.29.2:3020/api/carts/getCart/${id}`);
      updateCartCount(newCartCount.data.totalProductQuantity);
      updateCartIconColor('red');

      setTimeout(() => {
        updateCartIconColor('black');
      }, 1000);

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
          <Ionicons name="add-circle" size={30} color="black" onPress={() => handleAddItemToCart(item._id)} />
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