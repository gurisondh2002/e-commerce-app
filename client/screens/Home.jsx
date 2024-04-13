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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  const { userData } = useUser();

  const [locationName, setLocationName] = useState('');
  const [userId, setUserId] = useState(false);
  const [id, setId] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [cartCount, setCartCount] = useState();

  useEffect(() => {
    fetchStoredUserData();
    if (userId === 'true') {
      console.log(AsyncStorage.getItem('userEmail'))
      getCountCart();
      // console.log(cartCount); 
    } else {
      setCartCount(0);
    }
  }, [userId]);

  const fetchStoredUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userLogin');
      const storedId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId); 
      // console.log(userId)
      setId(storedId)
      console.log("usersdjfId", id);
      // console.log(cartCount)
    } catch (error) {
      console.error('Error fetching stored user data:', error);
    }
  };
  
  const getCountCart = async () => {
    try {
      // console.log("text",id)
      const resp = await axios.get(`http://192.168.5.60:3000/api/carts/getCart/${id}`);
      if (resp.status === 200) {
        console.log(resp.data.totalProductQuantity)
        setCartCount(resp.data.totalProductQuantity);
        
      } else {
        console.error(`Request failcedfdd mwith statcus ${resp.status}`);
      }
    } catch (error) {
      console.error('Error fetchihng cart count:', error);
    }
  };

  const navigation = useNavigation();
  const pic = userData.picture;

  useEffect(() => {
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
      setErrorMsg('Error fetchinng location');
    }
  };

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
              <Text style={styles.cartNumber}>{cartCount}</Text>
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
        <Products />
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