import { Alert, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import { useNavigation } from '@react-navigation/native'
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons, Feather } from "@expo/vector-icons"
import { useUser } from '../components/auth/userContext'
import axios from 'axios'

export default function UpdateProfile() {

    const navigation = useNavigation();
    const { userData, setUserData } = useUser();
    const [userLogin, setUserLogin] = useState(false);
    const [username, setUsername] = useState('');

    console.log("Image", userData.image)

    useEffect(() => {
        if (userData && userData.userId && userData.username && userData.email) {
            setUserLogin(true);
        } else {
            setUserLogin(false);
        }
    }, [userData]);



    const logout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout",
            [
                {
                    text: "Cancel", onPress: () => console.log("Cancel Presses")
                },
                {
                    text: "Continue", onPress: () => {
                        setUserData({ userId: null, username: null, email: null });
                        setUserLogin(false)
                        navigation.navigate("Home");
                        console.log("Continue Pressed")
                    }

                },
                {
                    text: "Ok", onPress: () => {
                        setUserData({ userId: null, username: null, email: null });
                        setUserLogin(false)
                        navigation.navigate("Home");
                        console.log("Continue Pressed")
                    }

                },
                { defaultIndex: 1 }
            ]
        )
    }
    const clearCache = () => {
        Alert.alert(
            "Clear Cache",
            "Are you sure you want to delete all saved data on your device",
            [
                {
                    text: "Cancel", onPress: () => console.log("Cancel Presses cache")
                },
                {
                    text: "Continue",
                    onPress: () => {
                        setUserData({ userId: null, username: null, email: null });
                        console.log("Cache cleared successfully.");
                    }
                }
            ],
            { cancelable: false }
        );
    }
    const deleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account",
            [
                {
                    text: "Cancel", onPress: () => console.log("Cancel Presses delete")
                },
                {
                    text: "Continue",
                    onPress: async () => {
                        try {
                            await axios.delete(`http://192.168.5.60:3020/api/users/${userData.userId}`);
                            setUserData({ userId: null, username: null, email: null });
                            console.log("Account deleted successfully.");
                        } catch (error) {
                            console.error("Error deleting account:", error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainer}>
                <StatusBar backgroundColor={COLORS.gray} />
                <View style={{ width: "100%" }}>
                    <Image source={require('../assets/images/profile-background.jpg')}
                        style={styles.cover} />

                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="edit" color={COLORS.primary} size={25} style={{ color: "white", fontWeight: "bold" }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileContainer}>
                    <Image
                        source={userData?.image ? { uri: userData.image } : require('../assets/images/profile-icon.png')}
                        style={styles.profile} />
                    <Text style={styles.name}>
                        {userLogin === true ? userData.username : "Please login into your account"}
                    </Text>
                    {userLogin === false ? (
                        <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                            <View style={styles.loginBtn}>
                                <Text style={styles.menuText}>L O G I N</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <View style={styles.loginBtn}>
                                <Text style={styles.menuText}>{userData.email}</Text>
                            </View>
                            <View style={styles.menuWrapper}>
                                <TouchableOpacity>
                                    <View style={styles.menuItem}>
                                        <MaterialCommunityIcons name="heart-outline" color={COLORS.primary} size={24} />
                                        <Text style={styles.menuText}>Name</Text>
                                        <TextInput
                                            style={styles.inputText}
                                            value={username}
                                            placeholder='Enter username'
                                            onChangeText={setUsername}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { navigation.navigate("Orders") }}>
                                    <View style={styles.menuItem}>
                                        <MaterialCommunityIcons name="truck-delivery-outline" color={COLORS.primary} size={24} />
                                        <Text style={styles.menuText}>Orders</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { navigation.navigate("Cart") }}>
                                    <View style={styles.menuItem}>
                                        <SimpleLineIcons name="bag" color={COLORS.primary} size={24} />
                                        <Text style={styles.menuText}>Cart</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={clearCache}>
                                    <View style={styles.menuItem}>
                                        <MaterialCommunityIcons name="cached" color={COLORS.primary} size={24} />
                                        <Text style={styles.menuText}>Clear Cache</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={deleteAccount}>
                                    <View style={styles.menuItem}>
                                        <AntDesign name="deleteuser" color={COLORS.primary} size={24} />
                                        <Text style={styles.menuText}>Delete Account</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={logout}>
                                    <View style={styles.menuItem}>
                                        <AntDesign name="logout" color={COLORS.primary} size={24} />
                                        <Text style={styles.menuText}>Logout</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    },
    cover: {
        height: 250,
        width: "100%",
        resizeMode: "cover",
    },
    container: {
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "absolute",
        top: SIZES.xLarge,
        width: SIZES.width - 44,
        zIndex: 999,
    },
    profileContainer: {
        flex: 1,
        alignItems: "center",
    },
    profile: {
        height: 145,
        width: 145,
        borderRadius: 999,
        borderColor: COLORS.primary,
        borderWidth: 2,
        resizeMode: "cover",
        marginTop: -90,
    },
    name: {
        fontFamily: "bold",
        color: COLORS.primary,
        marginVertical: 5,
    },
    loginBtn: {
        backgroundColor: COLORS.secondary,
        padding: 2,
        borderWidth: 0.4,
        alignItems: "center",
        borderColor: COLORS.primary,
        borderRadius: SIZES.xxLarge,
    },
    menuText: {
        fontFamily: "regular",
        color: COLORS.gray,
        marginLeft: 20,
        marginRight: 20,
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 26,
    },
    menuWrapper: {
        marginTop: SIZES.xLarge,
        width: SIZES.width - SIZES.large,
        backgroundColor: COLORS.lightWhite,
        borderRadius: 12,
    },
    menuItem: {
        borderBottomWidth: 0.5,
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderColor: COLORS.gray,
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
})