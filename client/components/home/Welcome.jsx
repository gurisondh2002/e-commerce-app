import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {Feather, Ionicons} from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {

    const navigation = useNavigation();

    const searchHandler = () =>{ 
        navigation.navigate("Search")
    }
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.textStyleA}>{" "}
                    Find The Most</Text>
                <Text style={styles.textStyleB}>{" "}
                    Luxurious Furniture</Text>
            </View>
            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWraper}>
                    <TextInput value='' style={styles.searchInput} onPressIn={searchHandler} placeholder="What are you looking for"/>
                </View>
                <View>
                    {/* <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        width:"100%",
    },
    textStyleA:{
        fontFamily:"bold",
        fontSize:SIZES.xxLarge -10,
        marginTop:-3,
        color:COLORS.black,
        marginHorizontal:12
    },
    textStyleB:{
        fontFamily:"bold",
        fontSize:SIZES.xxLarge -10,
        marginTop:-10,
        color:COLORS.primary,
        marginHorizontal:12
    },
    searchContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.medium,
        marginVertical:SIZES.medium,
        height:50
    },
    searchIcon:{
        marginHorizontal:10,
        color:COLORS.gray,
        paddingTop:SIZES.small,
    },
    searchWraper:{
        flex:1,
        backgroundColor:COLORS.secondary,
        marginRight:SIZES.small,
        borderRadius:SIZES.small,
    },
    searchInput:{
        fontFamily:"regular",
        width:"100%",
        height:"100%",
        paddingHorizontal:SIZES.small
    },
    searchBtn:{
        width:50,
        height:"100%",
        borderRadius:SIZES.medium,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:COLORS.primary,
        marginRight:5,
    },
})