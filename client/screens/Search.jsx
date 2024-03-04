import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView} from 'react-native-safe-area-context'
import {Feather, Ionicons} from '@expo/vector-icons'
import { COLORS, SIZES } from '../constants/theme'
import axios from 'axios'
import SearchedProducts from '../components/products/SearchedProducts'
// import { useNavigation } from '@react-navigation/native'

const Search = () => {

    const [searchKey, setSearchKey] = useState('');
    const[searchResults, setSearchResults] = useState([]);
    // console.log(searchKey)

    const handleSearch = async() =>{
        try{
            const response = await axios.get(`http://192.168.5.60:3000/api/products/search/${searchKey}`);
            // console.log(response.data);
            setSearchResults(response.data);
            setSearchKey('');
        }
        catch(err){
            console.log("Failed to search that product");
        }
    }

    const handlesearchResults = () =>{
        setSearchResults('')
    }

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
                    <TextInput onPressIn={handlesearchResults} style={styles.searchInput} 
                    value={searchKey}
                    onChangeText={setSearchKey}
                    placeholder="What are you looking for"/>
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                        <Feather name="search" size={24} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>
            {searchResults.length === 0 ? (
                <View style={{flex:1}}>
                    <Image source={require('../assets/images/search.png')}
                    style={styles.searchImage}/>
                </View>
            ):(
                <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                renderItem={({item}) =>(<SearchedProducts item={item} />)}/>
            )}
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
searchImage:{
    resizeMode:"contain",
    width:SIZES.width -10,
    height:SIZES.height -200,
},
})