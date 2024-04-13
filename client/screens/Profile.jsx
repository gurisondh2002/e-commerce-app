import React, { useEffect, useState } from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AntDesign, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from '../constants/theme';
import { useIsFocused } from '@react-navigation/native';

const Profile = () => {
  // const { userData, setUserData } = useUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userrId, setUserrId] = useState('')
  const [userrPic, setUserrPic] = useState('')

  // useFocusEffect(() => {
  //   console.log("h")
  //   const string =  fetchStoredUserData();
  //   console.log("string", string)
  // });

  const isFocused = useIsFocused();
 useEffect(() => {
        if (isFocused) {
          // console.log("h")
        fetchStoredUserData();
          // console.log("string", string)
        }
    }, [isFocused]);



  const fetchStoredUserData = async () => {
    try {

      setIsLoading(true);
      let mypromise = new Promise(async (resolve, reject) => {
        const storedUserLogin = await AsyncStorage.getItem('userId');
        if(storedUserLogin){
          console.log("wsdehhfgn")
          resolve(storedUserLogin)
        }
        else{
          console.log("reject")
          reject();
        }
      })
      await mypromise.then(async (sul) => {
        console.log("werfg", sul)
        if (sul) {
          let promise = new Promise(async (res, rej) => {
            setName(await AsyncStorage.getItem('userName'))
            setEmail(await AsyncStorage.getItem('userId'))
            setUserrId(await AsyncStorage.getItem('userEmail'))
            setUserrPic(await AsyncStorage.getItem('userPic'))
            res()
            console.log("fgjfhj")
          })
          await Promise.all(promise).then(() =>{
            console.log("werfgh")
          }).catch((err) =>{
            console.log("qwertwertergh nerr")
          })
          // setUserData({ username: storedUserName, userId: storedUserId, email: storedUserEmail, picture: storedUserPic });
        }
      })
      return "retyurn"
    } catch (error) {
      console.error('Error fetching stored user data:', error);
      return "catch"
    } finally {
      setIsLoading(false);
      return "final"
    }
  };

  const logout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel Pressed")
        },
        {
          text: "Continue", onPress: async () => {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userName');
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userPic');
            navigation.navigate("Home");
            console.log("Continue Pressed");
          }
        },
        {
          text: "Ok", onPress: () => {
            AsyncStorage.removeItem('userId');
            AsyncStorage.removeItem('userName');
            AsyncStorage.removeItem('userEmail');
            AsyncStorage.removeItem('userPic');
            navigation.navigate("Home");
            console.log("Ok Pressed");
          }
        }
      ],
      { cancelable: false }
    );
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are you sure you want to delete all saved data on your device",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel Pressed cache")
        },
        {
          text: "Continue",
          onPress: () => {
            // Clear cache logic here
          }
        }
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel Pressed delete")
        },
        {
          text: "Continue",
          onPress: async () => {
            try {
              const userId = await AsyncStorage.getItem('userId');
              await axios.delete(`http://192.168.5.60:3000/api/users/${userId}`);
              await AsyncStorage.removeItem('userId');
              await AsyncStorage.removeItem('userName');
              await AsyncStorage.removeItem('userEmail');
              await AsyncStorage.removeItem('userPic');
              console.log("Account deleted successfully.");
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  // const handleEditClick = () => {
  //   navigation.navigate("UpdateUser");
  // };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={COLORS.gray} />
      <Image source={require('../assets/images/profile-background.jpg')} style={styles.cover} />
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="edit" color={COLORS.primary} size={25} style={{color:"white", fontWeight:"bold"}} onPress={handleEditClick}/>
        </TouchableOpacity> */}
      </View>
      <View style={styles.profileContainer}>
        <Image source={userrPic ? { uri: userrPic } : require('../assets/images/profile-icon.png')} style={styles.profile} />
        <Text style={styles.name}>
          {name ? name : "Please login into your account"}
        </Text>
        {userrId ? (
          <>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{email}</Text>
            </View>
            <View style={styles.menuWrapper}>
              <TouchableOpacity onPress={() => { navigation.navigate("Favourites") }}>
                <View style={styles.menuItem}>
                  <MaterialCommunityIcons name="heart-outline" color={COLORS.primary} size={24} />
                  <Text style={styles.menuText}>Favourites</Text>
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
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>L O G I N</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Profile;

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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
