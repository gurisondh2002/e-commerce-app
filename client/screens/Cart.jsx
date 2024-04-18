// Cart.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native';

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchStoredUserData();
    }
  }, [isFocused]);

  const fetchStoredUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        fetchCart(storedUserId);
      } else {
        setUserId('');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching stored user data:', error);
      setIsLoading(false);
    }
  };

  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`http://192.168.29.2:3020/api/carts/find/${userId}`);
      if (res.status === 200) {
        setCart(res.data.cart);
        setIsLoading(false);
        console.log('Cart fetched successfully');
      } else {
        console.error(`Request failed with status ${res.status}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setIsLoading(false);
    }
  };

  const increment = async (productId) => {
    try {
      const response = await axios.post(`http://192.168.29.2:3020/api/carts/incCartItemQuantity/${userId}`, { productInCart: productId });
      console.log(response.data);
      console.log("Increment successfully")
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  }

  const decrement = async (productId) => {
    try {
      const response = await axios.post(`http://192.168.29.2:3020/api/carts/decCartItemQuantity/${userId}`, { productInCart: productId });
      console.log(response.data);
      console.log("Decrement successfully")
    } catch (error) {
      console.error('Error decrementing quantity:', error);
    }
  };

  const deletecartItem = async (cartId) => {
    try {
      const response = await axios.delete(`http://192.168.29.2:3020/api/carts/deleteCartItem/${cartId}`);
      console.log(response.data);
      console.log("Deleted successfully")
    } catch (error) {
      console.error('Error deleting quantity:', error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      {item.products.map((product) => (
        <View key={product._id} style={styles.divContainer}>
          <Image source={{ uri: product.productInCart.imageUrl }} style={styles.image} />
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{product.productInCart.title}</Text>
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>{product.productInCart.description}</Text>
            <View style={styles.rowContainer}>
              <Text style={styles.price}>${product.productInCart.price}</Text>
              <View style={styles.rating}>
                <TouchableOpacity>
                  <SimpleLineIcons name="plus" size={20} color="grey" onPress={() => increment(product.productInCart._id)} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{product.quantity}</Text>
                <TouchableOpacity>
                  <SimpleLineIcons name="minus" size={20} color="grey" onPress={() => decrement(product.productInCart._id)} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="delete" size={24} color="grey" onPress={() => deletecartItem(product._id)}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} color={COLORS.lightWhite} />
          </TouchableOpacity>
          <Text style={styles.heading}>Your Cart</Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={cart}
            keyExtractor={(item) => item._id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginTop: 40
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  firstContainer: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  listContainer: {
    flex: 1,
    paddingTop: SIZES.xxLarge,
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  productItem: {
    padding: SIZES.small,
    marginTop: 30,
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
    marginBottom: 20,
    padding: 5
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
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
  separator: {
    height: 16,
  },
});
