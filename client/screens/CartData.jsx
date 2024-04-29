import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from '../constants/theme';

const RenderProductItem = ({ item, onIncrement, onDecrement, onDelete }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [subtotal, setSubtotal] = useState(item.subtotal);

  const handleIncrement = async (productId) => {
    setQuantity(prevQuantity => prevQuantity + 1);
    onIncrement(productId);
  }

  const handleDecrement = async (productId) => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      onDecrement(productId);
    }
  }

  return (
    <View style={styles.productItem}>
      <View key={item.productInCart._id} style={styles.divContainer}>
        <Image source={{ uri: item.productInCart.imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.productInCart.title}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.description}>{item.productInCart.description}</Text>
          <View style={styles.rowContainer}>
            <Text style={styles.price}>${item.productInCart.price}</Text>
            <View style={styles.rating}>
              <TouchableOpacity onPress={() => handleIncrement(item.productInCart._id)}>
                <SimpleLineIcons name="plus" size={20} color="grey" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={() => handleDecrement(item.productInCart._id)}>
                <SimpleLineIcons name="minus" size={20} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="delete" size={24} color="grey" onPress={() => onDelete(item._id)} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.price1}>Subtotal: ${subtotal}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderProductItem;

const styles = StyleSheet.create({
  productItem: {
    padding: SIZES.small,
    marginTop: -10,
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
    // marginBottom: 20,
    padding: 5
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10
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
  price1: {
    fontFamily: "regular",
    fontSize: SIZES.small
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
  subtotal: {
    fontSize: SIZES.small,
    fontWeight: 'bold'
  },
  total: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    marginTop: 10,
    textAlign: 'center'
  },
  separator: {
    height: 16,
  },
});
