import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Discovry from "./screens/Discovery";
import BookInfo from "./screens/BookInfo";
import Bookpdf from "./screens/Bookpdf";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={Discovry} />
      <Stack.Screen name="BookInfo" component={BookInfo} />
      <Stack.Screen name="Bookpdf" component={Bookpdf} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
