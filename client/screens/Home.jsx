import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Fontisto } from "@expo/vector-icons"
import { SIZES, COLORS } from '../constants/theme'
import Welcome from '../components/home/Welcome'
import Carousel from '../components/Carousel'
import Heading from '../components/home/Heading'
import Products from '../components/products/Products'
// import Carousel from '../components/home/carousel'

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.textStyle}>Punjab</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousel/>
        <Heading/>
        <Products/>
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