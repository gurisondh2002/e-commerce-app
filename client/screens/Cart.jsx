import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Ionicons, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native';
import RenderProductItem from './CartData';
import Btn from '../components/Btn'

const Cart = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [free, setFree] = useState('')
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
        console.log("Cart data fetched:", res.data.cart.products);
        setCart(res.data.cart.products);
        setTotal(res.data.cart.total)
        setFree(res.data.cart.freeDelivery)
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }

  const handleCheckoutPress = () =>{
    navigation.navigate("Address")
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
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
              renderItem={({ item }) => <RenderProductItem item={item} />}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Order Info:</Text>
            <View style={styles.totalOrder}>
              <Text style={styles.total1}>Delivery Fee:</Text>
              <Text style={styles.total}>$ {free}</Text>
            </View>
            <View style={styles.totalOrder}>
              <Text style={styles.total1}>Total:</Text>
              <Text style={styles.total}>$ {total}</Text>
            </View>
            <Btn style={styles.btnStyle} title={`C h e c k o u t   $ ${total}`} onPress={handleCheckoutPress}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginTop: 20
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
    // flex: 1,
    paddingTop: SIZES.xxLarge,
    marginTop: 30,
    marginHorizontal: 12
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
  totalContainer: {
    marginTop: 20,
    marginHorizontal: 25
  },
  total: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  total1: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.gray
  },
  totalOrder: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  btnStyle: {
    color: COLORS.gray2
  }
});
