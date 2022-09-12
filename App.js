import * as React from "react";
import { StyleSheet, Text, Image, SafeAreaView, View } from "react-native";
import Userlogin from "./navigation/screens/Userlogin";
import UserSignUp from "./navigation/screens/UserSignUp";
import Maincontainer from "./navigation/Maincontainer";
import { NavigationContainer, navigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import "firebase/auth";

function App() {
  return <Maincontainer />;
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
