import * as React from "react";
import { StyleSheet, Text, Image, SafeAreaView, View } from "react-native";
import UserSignUp from "./navigation/screens/UserSignUp";
import WelcomePage from "./navigation/WelcomePage";
import Home from "./navigation/screens/Home";

import { NavigationContainer, navigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import Maincontainer from "./navigation/Maincontainer";
import ForgetPassword from "./navigation/screens/ForgetPassword";
import BookInfo from "./navigation/screens/BookInfo";
import Adminpage from "./navigation/screens/Adminpage";

const firebaseConfig = {
  apiKey: "AIzaSyCb8vT5-UmFZV-954feGAE2L0-T4Tgpqhs",
  authDomain: "group16-de98b.firebaseapp.com",
  projectId: "group16-de98b",
  storageBucket: "group16-de98b.appspot.com",
  messagingSenderId: "19414542563",
  appId: "1:19414542563:web:460d20dd6abdeabef47dd6",
  measurementId: "G-F5B7J7EDXR",
};

export const Stack = createNativeStackNavigator();
initializeApp(firebaseConfig);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="WelcomePage"
      >
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="Maincontainer" component={Maincontainer} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="UserSignUp" component={UserSignUp} />
        <Stack.Screen name="BookInfo" component={BookInfo} />
        <Stack.Screen name="Adminpage" component={Adminpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})*/
export default App;
