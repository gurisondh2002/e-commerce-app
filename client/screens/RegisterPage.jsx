import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Alert } from 'react-native';
import Btn from '../components/Btn';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons"

const RegisterPage = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [picture, setPicture] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [modal, setModal] = useState(false)

  useEffect(() => {
    if (loading) {
      handleRegister();
    }
  }, [loading]);

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      const response = await axios.post('http://192.168.29.2:3020/api/register', { username, email, password, location, picture },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        });
      if (response.status === 201) {
        Alert.alert(` is saved successfuly`)
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

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`

        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert("you need to give up permission to work")
    }
  }
  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA)
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5
      })
      if (!data.canceled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test.${data.uri.split(".")[1]}`

        }
        handleUpload(newfile)
      }
    } else {
      Alert.alert("you need to give up permission to work")
    }
  }

  const handleUpload = (image) => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'furnitureApp')
    data.append("cloud_name", "dhg6k869v")

    fetch("https://api.cloudinary.com/v1_1/dhg6k869v/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setPicture(data.url)
        setModal(false)
      }).catch(err => {
        Alert.alert("error while uploading")
      })
  }


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
            <Btn
              style={styles.inputStyle}
              icon={picture == "" ? "upload" : "check"}
              mode="contained"
              title="Upload Image"
              onPress={() => setModal(true)}>

            </Btn>
            <Btn title={"S I G N  U P"} onPress={() => setLoading(true)} />
            <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
              <Text style={styles.registerStyle}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loader}>
          <View style={styles.loaderBackground}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FontAwesome name="photo" size={60} color="grey" onPress={() => pickFromGallery()} style={styles.icon} />
            <AntDesign name="camera" size={60} color="grey" onPress={() => pickFromCamera()} style={styles.icon} />
            <Entypo name="cross" size={24} color="black" onPress={() => setModal(false)} style={styles.closeIcon} />
          </View>
        </View>
      </Modal>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", 
  },
  modalView: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
