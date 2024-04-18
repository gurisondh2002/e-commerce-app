import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { SIZES ,COLORS} from '../../constants/theme';
import axios from 'axios';
// import useFetch from '../../hook/useFetch';

const Products = ({ onCountChange, totalCartCount }) => {
    // const {data, isLoading, error} = useFetch();
    // const products = [1,2 ,3,4];

    const [data, setData] = useState(null);
    const [isLoading , setIsLoading] = useState(false)
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://192.168.29.2:3020/api/products/getllProducts');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
  
      fetchData();
    }, []);


  return (

    <View style={{marginTop:SIZES.medium, marginHorizontal:12}}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
      ):(
        <FlatList data={data} 
        keyExtractor={(item) => item._id}
        renderItem={({item}) => <ProductCard item={item}/>}
        horizontal
        contentContainerStyle={{ columnGap: SIZES.medium }}/>
      )}
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})