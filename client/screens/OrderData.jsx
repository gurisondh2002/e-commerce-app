import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const RenderOrder = ({ item }) => {
    const formatDeliveryDate = (date) => {
        const formattedDate = new Date(date).toLocaleDateString();
        return formattedDate;
    };

    const navigation = useNavigation();

    const handleOrderPress = () => {
        navigation.navigate('OrderPage', { item });
    };

    return (
        <TouchableOpacity>
            <View style={styles.productItem}>
                <View key={item._id} style={styles.divContainer}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.divRow}>
                            <Text style={styles.title}>Order ID: {item.orderId}</Text>
                            <Text style={[styles.deliveryStatus, { color: item.delivery_status === 'Delivered' ? COLORS.green : '#ff9999' }]}>
                                {item.delivery_status}
                            </Text>
                        </View>
                        <View style={styles.divRow}>
                            <Text style={styles.description}>Payment Method: {item.payment_method}</Text>
                            <Text style={[styles.deliveryStatus, { color: item.delivery_status === 'Paid' ? COLORS.green : '#ff9999' }]}>
                                {item.payment_status}
                            </Text>
                        </View>
                        <Text style={styles.description}>Delivery Date: {formatDeliveryDate(item.delivery_date)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RenderOrder;

const styles = StyleSheet.create({
    productItem: {
        padding: SIZES.small,
        marginTop: -10,
    },
    divContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.small,
        padding: 15,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    divRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
    },
    deliveryStatus: {
        fontFamily: 'regular',
        fontSize: SIZES.body3,
        color: COLORS.black,
        marginBottom: SIZES.small,
    },
    description: {
        fontFamily: 'bold',
        fontSize: SIZES.body3,
        color: COLORS.gray,
        marginBottom: SIZES.small,
    },
    separator: {
        height: 16,
    },
});
