import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'

const SearchedProducts = ({item}) => {

    const navigation = useNavigation();

    const handleSearch = () =>{
        navigation.navigate("ProductDetails", {item})
    }

  return (
    <View>
      <TouchableOpacity style={styles.mainContainer} onPress={handleSearch}>
        <View style={styles.image}>
            <Image source={{uri: item.imageUrl}} 
            style={styles.productImg}/>
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.supplier}>{item.supplier}</Text>
            <Text style={styles.supplier}>$ {item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SearchedProducts

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:SIZES.small,
        flexDirection:"row",
        padding:SIZES.medium,
        borderRadius:SIZES.small,
        backgroundColor:"#FFF",
        marginHorizontal:12
    },
    image:{
        width:70,
        backgroundColor:COLORS.secondary,
        justifyContent:"center",
        borderRadius:SIZES.medium,
        alignContent:"center",
    },
    productImg:{
        width:"100%",
        height:65,
        borderRadius:SIZES.small,
        resizeMode:"center",
    },
    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium,
    },
    productTitle:{
        fontSize:SIZES.medium,
        fontFamily:"bold",
        color:COLORS.primary,
    },
    supplier:{
        fontSize:SIZES.small + 2,
        fontFamily:"regular",
        color : COLORS.gray,
        marginTop:3,
    },
});