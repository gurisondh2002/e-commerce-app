import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Trendzy from '../assets/opt.jpg'
import Cart from '../assets/splash000.png'
import { COLORS, SIZES } from '../constants/theme';
import { AntDesign } from '@expo/vector-icons';

const ThirdSplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={Trendzy} width={10} height={10} style={{marginTop:30}} />
      <Image source={Cart} width={24} height={24} style={styles.image} />
      <View style={styles.text12}>
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <Text style={styles.text4}>easy & Safe</Text>
          <Text style={styles.text1}>PAYMENTS</Text>
          <Text style={styles.text2}>Easy checkout and safe payment method, Trusted by our customers from all over the world</Text>
        </View>
        <View style={{ alignItems: "flex-end", marginTop: 10, marginRight:50 }}>
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Bottom Navigator')}>
            <AntDesign name="arrowright" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text12: {
    height: "40%",
    marginTop: 50,
    backgroundColor: COLORS.primary,
   borderTopLeftRadius:35,
   borderTopRightRadius:35,
    width: SIZES.width,
  },
  nextButton: {
    borderRadius: 50,
    backgroundColor: COLORS.gray2,
    color:"white",
    padding:10
  },
  text4:{
    color:COLORS.white,
    fontSize:SIZES.xLarge
  },
  text1:{
    color:COLORS.white,
    fontFamily:"bold",
    fontSize:SIZES.xLarge
  },
  text2:{
    color:COLORS.white,
    fontSize:SIZES.large,
    marginHorizontal:2,
    textAlign:"center"
  }
});

export default ThirdSplashScreen;