import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons"
import { COLORS, SIZES } from '../constants/theme'
import { useIsFocused, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { item } = route.params;

  const [id, setId] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchStoredUserData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('userId');
        setId(storedId || '');
        if (storedId) {
          const response = await axios.get(`http://192.168.29.2:3020/api/favourites/${storedId}/${item._id}`);
          const favoriteItem = response.data.favoriteItem; 
          setIsFavorite(!!favoriteItem);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error fetching stored user data:', error);
      }
    };

    if (isFocused) {
      fetchStoredUserData();
    }
  }, [isFocused, item._id]);


  const handleFavouriteClick = async () => {
    try {
      if (!isFavorite) {
        await axios.post(`http://192.168.29.2:3020/api/favourites/addToFav/${id}`, {
          productInFav: item._id
        });
        setIsFavorite(true);
      } else {
        await axios.delete(`http://192.168.29.2:3020/api/favourites/deleteFavItem/${item._id}`);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setIsFavorite(!isFavorite); // Toggle the state if an error occurs
    }
  };


  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFavouriteClick}>
            <Ionicons name="heart" size={30} color={isFavorite ? "red" : "white"} />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: item.imageUrl }} style={styles.image} />

        <View style={styles.detials}>
          <View style={styles.titleStyle}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>

          <View style={styles.ratingStyle}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Ionicons key={index}
                  name='star'
                  size={24}
                  color="gold" />
              ))}
              <Text style={styles.ratingText}>(4.9)</Text>
            </View>
          </View>

          <View style={styles.descriptionStyle}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descriptionText}>
              {item.description}
            </Text>
          </View>

          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20} />
                <Text>{item.product_location}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons name="truck-outline" size={20} color="black" />
                <Text>  Free Delivery </Text>
              </View>
            </View>
          </View>

          <View style={styles.cartStyle} >
            <TouchableOpacity onPress={() => handleAddItemToCart(item._id)} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleAddItemToCart(item._id)} style={styles.addCart}>
              <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  detials: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.white,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleStyle: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "semibold",
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  ratingStyle: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    paddingHorizontal: SIZES.small,
  },
  descriptionStyle: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "regular",
    fontSize: SIZES.large - 2,
  },
  descriptionText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartStyle: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
})