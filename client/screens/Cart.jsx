import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../constants/theme';
import ProductCard from '../components/products/ProductCard';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ onCountChange, totalCartCount }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState('');

  const navigation = useNavigation()

  const fetchStoredUserData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('userId');
      // console.log(userId)
      setId(storedId)
      console.log("ud", id);
      // console.log(cartCount)
    } catch (error) {
      console.error('Error fetching stored user data:', error);
    }
  };

  useEffect(() => {
    fetchStoredUserData();
    handleViewCart();
  }, []);


  const handleViewCart = async () => {
    try {
      console.log(id);
      const res = await axios.get(`http://192.168.5.60:3000/api/carts/find/${id}`);
      if (res.status === 200) {
        const cartData = res.data;
        const productsArray = cartData.message[0].products;
        console.log(productsArray)
        setData(productsArray);
        console.log('Products fetched successfully');
      } else {
        console.error(`Request failed with status ${res.status}`);
      }
    } catch (error) {
      console.error('Error fchingjh products of cart:', error);
    }
  };
  

  const handleCountChange = (count) => {
    onCountChange(count);
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <ScrollView>
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} color={COLORS.lightWhite} />
          </TouchableOpacity>
          <Text style={styles.heading}>Your Cart</Text>
        </View>
        <View style={styles.mapContainer}>
          <FlatList data={data} numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ProductCard item={item} />}
            contentContainerStyle={styles.mainContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />} />
        </View>
      </View>
    </SafeAreaView>
    </ScrollView>
  )
}

export default Cart

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
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
  mapContainer:{
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
    marginTop: 30
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
  separator: {
    height: 16,
  },
})