import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES } from '../constants/theme'
import { Ionicons } from "@expo/vector-icons"
import ProductList from '../components/products/ProductList'

const NewRivals = ({ navigation }) => {

  const [totalCartCount, setTotalCartCount] = useState(0);
  const [cartItems, setCartItems] = useState(new Set());

    const handleCartCountChange = (count, itemId) => {
        if (cartItems.has(itemId)) {
          setTotalCartCount(totalCartCount + 1);
        } else {
          setCartItems(new Set(cartItems).add(itemId));
          setTotalCartCount(totalCartCount + count);
        }
      }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back-circle" size={30} color={COLORS.lightWhite} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Products</Text>
                </View>
                <ProductList onCountChange={handleCartCountChange} totalCartCount={totalCartCount}/>
            </View>
        </SafeAreaView>
    )
}

export default NewRivals

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
    heading: {
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.lightWhite,
        marginLeft: 5
    }
})