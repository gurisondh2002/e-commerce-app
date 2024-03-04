import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Btn from '../components/Btn';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// import AnimatedLoader from 'react-native-animated-loader';
import LottieView from 'lottie-react-native';

const RegisterPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  

  useEffect(() => {
    if (loading) {
      handleRegister();
    }
  }, [loading]);

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('location', location);
      if (image) {
        formData.append('image', {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'user.jpg'
        });
      }
      const response = await axios.post('http://192.168.5.60:3000/api/register', { username, email, password, location });
      if (response.status === 201) {
        navigation.navigate('Login');
        console.log(response.data);
      } else {
        setErrorMessage("Registration failed");
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  }

  const validateForm = () => {
    let isValid = true;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      setErrorMessage("Invalid email");
    }
    if (!password.trim()) {
      isValid = false;
      setErrorMessage("Password is required");
    }
    return isValid;
  };

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    } catch (error) {
      console.error('Image picker error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        <View style={{ marginHorizontal: 20 }}>
          <CustomButton onPress={() => navigation.goBack()} />
          <Image source={require('../assets/images/login.png')} style={styles.cover} />
          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <View>
            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.inputText}
              value={username}
              placeholder='Enter username'
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputText}
              value={email}
              placeholder='Enter Email'
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputText}
              secureTextEntry
              value={password}
              placeholder='Enter password'
              onChangeText={setPassword}
            />
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.inputText}
              value={location}
              placeholder='Enter location'
              onChangeText={setLocation}
            />
            {/* <TouchableOpacity style={styles.inputText} onPress={pickImage}>
              <Text style={{ color: COLORS.gray }}>Select Profile Image</Text>
            </TouchableOpacity> */}
            {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, marginBottom: 10 }} />}
            <Btn title={"S I G N  U P"} onPress={() => setLoading(true)} />
            <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
              <Text style={styles.registerStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loader}>
          {/* <AnimatedLoader
      visible={loading}
      overlayColor="rgba(255,255,255,0.75)"
      animationStyle={styles.lottie}
      animationData={require("../assets/loading.json")}
      speed={1}>
    </AnimatedLoader> */}
    {/* <LottieView
  source={require('../assets/Animation.json')}
  autoPlay
  loop
/> */}
 <View style={styles.loaderBackground}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  cover: {
    height: 230,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.primary,
    alignItems: "center",
    marginBottom: SIZES.large,
    marginTop: -30
  },
  inputText: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 1,
    alignItems: "center",
    marginBottom: 10,
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
    margin: -5,
  },
  registerStyle: {
    color: COLORS.gray,
    fontFamily: "bold",
    fontSize: 20,
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  lottie: {
    width: 100,
    height: 100,
  }
});
