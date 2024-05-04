import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductList = () => {
    const [data, setData] = useState(null);
    const [isLoading , setIsLoading] = useState(false)

    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://192.168.29.2:3020/api/products/getllProducts');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error, "err");
      }
    };

    useEffect(() => {
      fetchData();
    }, []);


    if(isLoading){
        return(
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
            </View>
        );
    }
  return (
    <View style={styles.mainContainer}>
        <FlatList data={data} numColumns={2} 
         keyExtractor={(item) => item._id}
         renderItem={({item}) => <ProductCard item={item}/>}
        contentContainerStyle={styles.mainContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}/>
    </View>
  )

  // <View style={{marginTop:SIZES.medium, marginHorizontal:12}}>
  //     {isLoading ? (
  //       <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary}/>
  //     ):(
  //       <FlatList data={data} 
  //       // keyExtractor={(item) => item._id}
  //       renderItem={({item}) => <ProductCard item={item}/>}
  //       // horizontal
  //       contentContainerStyle={styles.mainContainer}
  //       ItemSeparatorComponent={() => <View style={styles.separator} />}/>
  //     )}
  //   </View>
}

export default ProductList

const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
    },
    mainContainer:{
        alignItems:"center",
        paddingTop:SIZES.xxLarge,
        paddingLeft:SIZES.small/2,
    },
    separator:{
        height:16,
    },
});