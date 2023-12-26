import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { Ionicons} from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

const ProductCard = () => {

    const navigation = useNavigation();

    const productHandler = () =>{
        navigation.navigate("ProductDetails")
    }
  return (
    <TouchableOpacity onPress={productHandler}>
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={{uri :"https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}} style={styles.image}/>
            </View>

            <View style={styles.detials}>
                <Text style={styles.title} numberOfLines={1}>
                    Product jndcnckjdncxkjjbkjnkjnkjn
                </Text>

                <Text style={styles.supplier} numberOfLines={1}>
                    Product
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                    $1234
                </Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle" size={30} color="black" />
            </TouchableOpacity>
        </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    mainContainer:{
        width:182,
        height:215,
        marginEnd:10,
        borderRadius:SIZES.medium,
        backgroundColor:COLORS.secondary,
    },
    imageContainer:{
        flex:1,
        width:170,
        marginLeft:SIZES.small/2,
        marginTop:SIZES.small/2,
        borderRadius:SIZES.small,
        overflow:"hidden",
    },
    image:{
        aspectRatio:1,
        resizeMode:"cover",
    },
    detials:{
        padding:SIZES.xSmall,
    },
    title:{
        fontFamily:"bold",
        fontSize:SIZES.large,
        marginBottom:1,
    },
    supplier:{
        fontFamily:"regular",
        fontSize:SIZES.small,
        color:COLORS.gray,
    },
    price:{
        fontFamily:"bold",
        fontSize:SIZES.medium,
        // marginBottom:2
    },
    addBtn:{
        position:"absolute",
        bottom:SIZES.xSmall,
        right:SIZES.xSmall
    }
})