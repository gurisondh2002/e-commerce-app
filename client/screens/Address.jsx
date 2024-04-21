import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Dimensions, ScrollView, SafeAreaView, Text, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import RenderAddress from './RenderAddresses';
import Btn from '../components/Btn';

const screenHeight = Dimensions.get('window').height;

export default function MapScreen({ navigation }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const mapRef = useRef(null);
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    houseNo: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phoneNumber: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const openPaymentModal = () => {
    setPaymentModalVisible(true);
  };

  const closePaymentModal = () => {
    setPaymentModalVisible(false);
  };

  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchStoredUserData();
    }
  }, [isFocused]);

  const fetchStoredUserData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        fetchAddresses(storedUserId);
        fetchCart(storedUserId);
      } else {
        setUserId('');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching stored user data:', error);
      setIsLoading(false);
    }
  };

  const fetchAddresses = async (userId) => {
    try {
      const res = await axios.get(`http://192.168.29.2:3020/api/users/${userId}`);
      if (res.status === 200) {
        setAddress(res.data.addresses)
        console.log("User data ==> ", res.data.addresses)
        setIsLoading(false);
        console.log('User fetched successfully');
      } else {
        console.error(`Request failed with status ${res.status}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setMapLoaded(true);
    })();
  }, []);

  const handleGetCurrentLocation = async () => {
    setLoading(true);
    let location = await Location.getCurrentPositionAsync({});
    const newLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setCurrentLocation(newLocation);
    mapRef.current.animateToRegion({
      ...newLocation,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleAddNewAddress = () => {
    setModalVisible(true);
  };

  const handleSaveNewAddress = async () => {
    try {
      const response = await axios.post(`http://192.168.29.2:3020/api/address/add`, {
        userId: userId,
        fullName: newAddress.fullName,
        houseNo: newAddress.houseNo,
        city: newAddress.city,
        state: newAddress.state,
        country: newAddress.country,
        postalCode: newAddress.postalCode,
        phoneNumber: newAddress.phoneNumber
      });
      console.log(response.data);
      console.log("Address added successfully");
      setModalVisible(false);
      setNewAddress({
        fullName: '',
        houseNo: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
      });
      console.log("Address added successfully");
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const fetchCart = async (userId) => {
    try {
      const res = await axios.get(`http://192.168.29.2:3020/api/carts/find/${userId}`);
      if (res.status === 200) {
        console.log("Cart data fetched:", res.data.cart);
        setCart(res.data.cart.products);
        setIsLoading(false);
        console.log('Cart fetched successfully');
      } else {
        console.error(`Request failed with status ${res.status}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setIsLoading(false);
    }
  };

  const handleOrderNow = async () => {
    try {
      const products = cart.map(item => item.productInCart._id);
      const orderData = {
        userId: userId,
        productId: products,
        address: selectedAddressId,
        delivery_status: 'Not Delivered',
        payment_method: paymentMethod,
      };
      const response = await axios.post('http://192.168.29.2:3020/api/orders/addOrder', orderData);
      console.log('Order placed successfully:', response.data.newOrder);
      navigation.navigate("OrderComplete")
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };


  const handleRegionChange = (region) => {
    setCurrentLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };


  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.firstContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-circle" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.heading}>Address</Text>
          </View>
          <View style={styles.mapContainer}>
            {mapLoaded && (
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: currentLocation?.latitude || 37.78825,
                  longitude: currentLocation?.longitude || -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onRegionChange={handleRegionChange}
              >
                {currentLocation && (
                  <Marker
                    coordinate={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    }}
                    title="You are here"
                  />
                )}
              </MapView>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.btnStyle} onPress={handleGetCurrentLocation} disabled={loading}>
                <Text style={styles.btnText}>Get Current Location</Text>
                {loading && <ActivityIndicator style={styles.loader} size="small" />}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.addressFont}>Select Address </Text>
            <View style={styles.listContainer}>
              <FlatList
                data={address}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <RenderAddress
                  item={item}
                  selected={item._id === selectedAddressId}
                  onPress={() => setSelectedAddressId(item._id)}
                />}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.btnStyle1} onPress={handleAddNewAddress}>
              <Text style={styles.btnText1}>+ ADD NEW ADDRESS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BtnContainer}>
            <Btn title={"O R D E R  N O W"} onPress={openPaymentModal} />
          </View>


        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={newAddress.fullName}
              onChangeText={(text) => setNewAddress({ ...newAddress, fullName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="House No"
              value={newAddress.houseNo}
              onChangeText={(text) => setNewAddress({ ...newAddress, houseNo: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={newAddress.city}
              onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={newAddress.state}
              onChangeText={(text) => setNewAddress({ ...newAddress, state: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Country"
              value={newAddress.country}
              onChangeText={(text) => setNewAddress({ ...newAddress, country: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Postal Code"
              value={newAddress.postalCode}
              onChangeText={(text) => setNewAddress({ ...newAddress, postalCode: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newAddress.phoneNumber}
              onChangeText={(text) => setNewAddress({ ...newAddress, phoneNumber: text })}
            />
            <View style={styles.buttonS}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveNewAddress}>
                <Text style={styles.saveButtonText}>Save Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={() => { setModalVisible(false) }}>
                <Text style={styles.saveButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={paymentModalVisible}
        onRequestClose={closePaymentModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'COD' && styles.selectedPaymentOption]}
              onPress={() => selectPaymentMethod('COD')}
            >
              <Text style={[styles.paymentOptionText, paymentMethod === 'COD' && styles.selectedPaymentOptionText]}>
                Cash on Delivery (COD)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'Google Pay' && styles.selectedPaymentOption]}
              onPress={() => selectPaymentMethod('Google Pay')}
            >
              <Text style={[styles.paymentOptionText, paymentMethod === 'Google Pay' && styles.selectedPaymentOptionText]}>
                Google Pay
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'PhonePe' && styles.selectedPaymentOption]}
              onPress={() => selectPaymentMethod('PhonePe')}
            >
              <Text style={[styles.paymentOptionText, paymentMethod === 'PhonePe' && styles.selectedPaymentOptionText]}>
                PhonePe
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'Card' && styles.selectedPaymentOption]}
              onPress={() => selectPaymentMethod('Card')}
            >
              <Text style={[styles.paymentOptionText, paymentMethod === 'Card' && styles.selectedPaymentOptionText]}>
                Card
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'NetBanking' && styles.selectedPaymentOption]}
              onPress={() => selectPaymentMethod('NetBanking')}
            >
              <Text style={[styles.paymentOptionText, paymentMethod === 'NetBanking' && styles.selectedPaymentOptionText]}>
                Netbanking
              </Text>
            </TouchableOpacity>
            <View style={styles.buttonS}>
              <TouchableOpacity style={styles.saveButton} onPress={handleOrderNow}>
                <Text style={styles.saveButtonText}>Order Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={closePaymentModal}>
                <Text style={styles.saveButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    marginTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  firstContainer: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  listContainer: {
    // flex: 1,
    paddingTop: SIZES.xxLarge,
    marginTop: -30,
    marginHorizontal: 12
  },
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5
  },
  mapContainer: {
    marginTop: 80,
    height: screenHeight * 0.3,
    marginHorizontal: 20,
    borderRadius: 10
  },
  addressFont: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginHorizontal: 20,
    marginTop: 10
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    // position:'absolute',
    bottom: 20,
    left: 30

  },
  btnStyle: {
    height: 40,
    width: "80%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  btnStyle1: {
    height: 40,
    width: "50%",
    display: "flex",
    marginHorizontal: 23,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  btnText: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },
  btnText1: {
    fontFamily: "bold",
    color: COLORS.gray,
    fontSize: SIZES.medium,
  },
  loader: {
    marginLeft: 10,
    color: COLORS.gray
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.lightWhite,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginHorizontal: 12,
    marginVertical: 2
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  saveButtonText: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  buttonS: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20
  },
  BtnContainer: {
    marginHorizontal: 26
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    marginHorizontal: 12,
    marginVertical: 2,
  },
  paymentOptionText: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  selectedPaymentOption: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  selectedPaymentOptionText: {
    color: COLORS.primary,
  },
});
