import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import { COLORS, SIZES } from '../constants/theme';

const RenderProductItem = ({ item, selected, onPress, onEdit, onDelete }) => {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleEdit = () => {
        setEditModalVisible(true);
    };

    const handleDelete = () => {
        setDeleteModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
    };

    const handleCloseDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const handleDeleteConfirm = async () => {
            setDeleteModalVisible(false);
            onDelete();
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Address: ${item.fullName}, ${item.houseNo}, ${item.city}, ${item.state}, ${item.country}, ${item.postalCode}, Phone Number: ${item.phoneNumber}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Address shared successfully');
                } else {
                    console.log('Address shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <View style={styles.productItem}>
            <TouchableOpacity onPress={onPress} style={[styles.divContainer, selected && styles.selectedAddress]}>
                <View>
                    <Ionicons name="home-outline" size={24} color={COLORS.gray} />
                </View>
                <View style={styles.detaialsContainer}>
                    <Text style={styles.fullName}>{item.fullName}</Text>
                    <Text style={styles.addressFontt}>{item.houseNo}, {item.city}, {item.state}, {item.country}, {item.postalCode}</Text>
                    <Text style={styles.phoneFont}>Phone Number: {item.phoneNumber}</Text>
                    <View style={styles.editDelete}>
                        <TouchableOpacity onPress={handleEdit}>
                            <Text style={styles.edittt}>EDIT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={styles.edittt}>DELETE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleShare}>
                            <MaterialCommunityIcons name="share-outline" size={24} color={COLORS.primary} style={{ marginTop: -4, borderWidth: 1, borderColor: COLORS.gray2, borderRadius: 50 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            <EditModal
                isVisible={editModalVisible}
                onClose={handleCloseEditModal}
                item={item}
                onEdit={onEdit}
            />
            <DeleteModal isVisible={deleteModalVisible} onClose={handleCloseDeleteModal} onDelete={handleDeleteConfirm} item={item} />
        </View>
    );
};

export default RenderProductItem;

const styles = StyleSheet.create({
    productItem: {
        padding: 10,
    },
    divContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        gap: 10,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.small,
        padding: 10
    },
    detaialsContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    addressFontt: {
        fontFamily: "regular",
        fontSize: SIZES.small,
    },
    phoneFont: {
        fontFamily: "regular",
        fontSize: SIZES.small
    },
    fullName: {
        fontFamily: "bold",
        fontSize: SIZES.medium
    },
    edittt: {
        color: COLORS.primary,
        fontFamily: "bold"
    },
    editDelete: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20,
        marginTop: 10
    },
    separator: {
        height: 16,
    },
    addressContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    selectedAddress: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    addressText: {
        fontSize: 16,
    },
});
