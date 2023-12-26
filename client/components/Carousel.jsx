import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {SliderBox} from 'react-native-image-slider-box'
import { COLORS } from '../constants/theme'

const Carousel = () => {

    const slides = [
      "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4968390/pexels-photo-4968390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4049793/pexels-photo-4049793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ]
  return (
    <View style={styles.carouselContainer}>
        <SliderBox images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{borderRadius: 15 , width:"95%", marginTop: 15}}
        autoplay
        circleLoop
        />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer:{
        flex:1,
        alignItems:"center",
    },
});