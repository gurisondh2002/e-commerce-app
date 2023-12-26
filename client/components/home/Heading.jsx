import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { Ionicons } from '@expo/vector-icons';

const Heading = () => {
  return (
    <View style={styles.mainConatiner}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>New Rivals</Text>
            <TouchableOpacity>
                <Ionicons name="ios-grid" size={24} color={COLORS.black}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({
    mainConatiner:{
        marginTop:SIZES.medium,
        marginHorizontal: 12
    },
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    headerTitle:{
        fontFamily:"semibold",
        fontSize:SIZES.xLarge -2,
    }
})