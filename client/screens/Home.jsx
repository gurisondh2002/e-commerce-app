import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Fontisto } from "@expo/vector-icons"
import { SIZES, COLORS } from '../constants/theme'
import Welcome from '../components/home/Welcome'
import Carousel from '../components/Carousel'
import Heading from '../components/home/Heading'
import Products from '../components/products/Products'
import * as Location from 'expo-location';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../components/auth/userContext'

const Home = () => {

  const { userData } = useUser();

  const [locationName, setLocationName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [totalCartCount, setTotalCartCount] = useState(0);
  const [cartItems, setCartItems] = useState(new Set());

  const navigation = useNavigation();
  const userId = userData.userId;

  useEffect(() => {
    console.log('User ID Homjjje page:', userId);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchLocationName(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      const data = response.data;
      if (data.address) {
        const mainName = data.address.city || data.address.village || data.address.county || data.address.state;
        setLocationName(mainName);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setErrorMsg('Error fetching location');
    }
  };
  const handleCartCountChange = (count, itemId) => {
    if (cartItems.has(itemId)) {
      setTotalCartCount(totalCartCount + 1);
    } else {
      setCartItems(new Set(cartItems).add(itemId));
      setTotalCartCount(totalCartCount + count);
    }
  }

  const handleCartClick = () =>{
    navigation.navigate("Cart")
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.textStyle}>{locationName || 'Fetching location...'}</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{totalCartCount}</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} onPress={handleCartClick}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel/>
        <Heading/>
        <Products  onCountChange={handleCartCountChange} totalCartCount={totalCartCount}/>
      </ScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 22,
    marginTop: 20
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textStyle: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999
  },
  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite
  },
})