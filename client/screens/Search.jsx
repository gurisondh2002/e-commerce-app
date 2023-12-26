import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import {Feather, Ionicons} from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants/theme'
// import { useNavigation } from '@react-navigation/native'

const Search = () => {

//     const navigation = useNavigation();

//   const searchHandler = () =>{ 
//     navigation.navigate("Search")
// }
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWraper}>
                    <TextInput style={styles.searchInput} onPressIn={() =>{}} placeholder="What are you looking for"/>
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
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