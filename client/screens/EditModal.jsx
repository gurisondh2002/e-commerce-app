import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditModal = ({ isVisible, onClose, item, onEdit}) => {
    const [userId, setUserId] = useState('');
    const isFocused = useIsFocused();
    const [newAddress, setNewAddress] = useState({
        fullName: '',
        houseNo: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phoneNumber: ''
    });

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
            } else {
                setUserId('');
            }
        } catch (error) {
            console.error('Error fetching stored user data:', error);
        }
    };

    useEffect(() => {
        if (item) {
            setNewAddress({
                ...newAddress,
                fullName: item.fullName,
                houseNo: item.houseNo,
                city: item.city,
                state: item.state,
                postalCode: item.postalCode,
                country: item.country,
                phoneNumber: item.phoneNumber
            });
        }
    }, [item]);

    const handleEditAddress = async () => {
        try {
            const response = await axios.put(`http://192.168.29.2:3020/api/address/update/${item._id}`, {
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
            console.log("Address edit successful");
            onClose();
            onEdit(response.data.updateAddress);
        } catch (error) {
            console.error('Error editing address:', error);
        }
    }

    const {
        fullName,
        houseNo,
        city,
        state,
        postalCode,
        country,
        phoneNumber
    } = newAddress;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Address</Text>
                    <TextInput
                        style={styles.input}
                        value={fullName}
                        onChangeText={text => setNewAddress({ ...newAddress, fullName: text })}
                        placeholder="Full Name"
                    />
                    <TextInput
                        style={styles.input}
                        value={houseNo}
                        onChangeText={text => setNewAddress({ ...newAddress, houseNo: text })}
                        placeholder="House No"
                    />
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={text => setNewAddress({ ...newAddress, city: text })}
                        placeholder="City"
                    />
                    <TextInput
                        style={styles.input}
                        value={state}
                        onChangeText={text => setNewAddress({ ...newAddress, state: text })}
                        placeholder="State"
                    />
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={text => setNewAddress({ ...newAddress, country: text })}
                        placeholder="Country"
                    />
                    <TextInput
                        style={styles.input}
                        value={postalCode}
                        onChangeText={text => setNewAddress({ ...newAddress, postalCode: text })}
                        placeholder="Postal Code"
                    />
                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={text => setNewAddress({ ...newAddress, phoneNumber: text })}
                        placeholder="Phone Number"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleEditAddress}>
                            <Text style={styles.saveButtonText}>Edit Address</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.lightWhite,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 5,
    },
    modalTitle: {
        fontFamily: 'semibold',
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
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        gap:20
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 10,
        marginLeft: 10,
    },
    saveButtonText: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.white,
    },
    cancelButton: {
        backgroundColor: COLORS.gray,
        borderRadius: 8,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
    cancelButtonText: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.white,
    },
};

export default EditModal;
