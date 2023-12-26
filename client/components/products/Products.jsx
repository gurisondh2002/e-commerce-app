import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { SIZES } from '../../constants/theme';

const Products = () => {

    const products = [1,2 ,3,4];
  return (
    <View style={{marginTop:SIZES.medium, marginHorizontal:12}}>
      <FlatList data={products} renderItem={({item}) => <ProductCard/>}
      horizontal
      contentContainerStyle={{ columnGap: SIZES.medium }}/>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})