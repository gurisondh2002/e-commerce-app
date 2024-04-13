import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton'
import { COLORS, SIZES } from '../constants/theme'
import Btn from '../components/Btn'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../components/auth/userContext'

const LoginPage = () => {
  const { userData, setUserData } = useUser();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://192.168.5.60:3000/api/login', { email, password });
      if (response.status === 200) {
        
        let promise = new Promise(async (res, rej) => {
            await AsyncStorage.setItem('userEmail', response.data.email);
            await AsyncStorage.setItem('userName', response.data.username);
            await AsyncStorage.setItem('userId', response.data._id);
            if (response.data.picture) {
                await AsyncStorage.setItem('userPic', response.data.picture);
            }
            res()
        })
        await Promise.all(promise).then(async() =>{
          // console.log("User Email ==> ", await AsyncStorage.getItem('userEmail'))
            navigation.navigate('Profile')
        }
        ).catch(err => {
            setErrorMessage(err)
        })

      } else {
        setErrorMessage("Login failjed");
        // await AsyncStorage.setItem('userLogin', 'false');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.response.data.message || 'Invalid email or password');
      // await AsyncStorage.setItem('userLogin', 'false');
    }
  };
  


  const validateForm = () => {
    let isValid = true;

    if (!email.trim()) {
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
    }

    if (!password.trim()) {
      isValid = false;
    }
    return isValid;
  };


  const handleSignUp = () => {
    navigation.navigate("SignUp")
  }


  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <CustomButton onPress={() => navigation.goBack()} />
          <Image source={require('../assets/images/login.png')} style={styles.cover} />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <View>
            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
            <Text style={styles.label}>Email</Text>
            <TextInput
              label="Email"
              value={email}
              style={styles.inputText}
              placeholder='Enter Email'
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              label="Password"
              style={styles.inputText}
              secureTextEntry
              value={password}
              placeholder='Enter password'
              onChangeText={setPassword}
            />
            <Btn title={"L O G I N"} onPress={handleSubmit} />
            <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
              <Text style={styles.registerStyle}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.6,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.primary,
    alignItems: "center",
    marginBottom: SIZES.xxLarge,
  },
  inputText: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 1,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: COLORS.lightWhite,
    color: "black",
    paddingHorizontal: 15
  },
  label: {
    padding: 5,
    color: COLORS.gray
  },
  registerButton: {
    alignItems: "center",
    margin: 10,
  },
  registerStyle: {
    color: COLORS.gray,
    fontFamily: "bold",
    fontSize: 20,
  },
})