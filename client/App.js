import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import ProductDetails from './screens/ProductDetails';
import NewRivals from './screens/NewRivals';
import LoginPage from './screens/LoginPage';
import Favourites from './screens/Favourites';
import Orders from './screens/Orders';
import Cart from './screens/Cart';
import RegisterPage from './screens/RegisterPage';
import { UserProvider } from './components/auth/userContext';
import updateProfile from './screens/updateProfile';


const Stack = createNativeStackNavigator();

export default function App() {


  const [fontsLoaded] = useFonts({
    regular : require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold:require("./assets/fonts/Poppins-Bold.ttf"),
    medium:require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold:require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async() =>{

    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  },[fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Bottom Navigator" component={BottomTabNavigation} options={{ headerShown:false}}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown:false}}/>
        <Stack.Screen name="ProductList" component={NewRivals} options={{ headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown:false}}/>
        <Stack.Screen name="SignUp" component={RegisterPage} options={{ headerShown:false}}/>  
        <Stack.Screen name="Favourites" component={Favourites} options={{ headerShown:false}}/>
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown:false}}/>
        <Stack.Screen name="Cart" component={Cart} options={{ headerShown:false}}/>      
        <Stack.Screen name="UpdateUser" component={updateProfile} options={{ headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle : {
    fontFamily : "extrabold",
    fontSize : 20
  }
});
