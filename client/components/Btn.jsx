import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

const Btn = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.btnStyle} onPress={onPress}>
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Btn

const styles = StyleSheet.create({
    btnText:{
        fontFamily:"bold",
        color:COLORS.white,
        fontSize:18,
    },
    btnStyle:{
        height:50,
        width:"100%",
        marginVertical:20,
        backgroundColor:COLORS.primary,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:12,
    },
})