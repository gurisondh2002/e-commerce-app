import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

const DeleteModal = ({ isVisible, onClose, onDelete, item }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Delete Address</Text>
                    <Text style={styles.modalText}>Are you sure you want to delete this address?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={onDelete}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        width: '80%',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: 'semibold',
        fontSize: SIZES.large,
        marginBottom: 10,
    },
    modalText: {
        fontFamily: 'regular',
        fontSize: SIZES.medium,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    deleteButton: {
        backgroundColor: COLORS.primary,
        marginRight: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    buttonText: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
        color: COLORS.white,
    },
});

export default DeleteModal;
