import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../constants/theme';
import ProductCard from '../components/products/ProductCard';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native';

const Cart = ({ onCountChange, totalCartCount }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()


  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://192.168.5.60:3000/api/products/');
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

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
            renderItem={({ item }) => <ProductCard item={item} onCountChange={(count) => handleCountChange(count)} />}
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