
import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Stack } from "../App";


import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Home from "./screens/Home";
import Lists from "./screens/Lists";

import Discovery from "./screens/Discovery";
import Account from "./screens/Account";
import More from "./screens/More";

//Screen names
const HomeName = "Home";
const ListssName = "Lists";

const MoreName = "More";
const DiscovryName = "Discovery";
const AccountName = "Account";


//export default Maincontainer;

export default function Maincontainer({ navigation }) {
  
  return (
    //for bottom navigation
    
      <Stack.Navigator
        initialRouteName={HomeName} //to go to the first screen
        screenOptions={({ route }) => ({
          //route means the location u r at

          tabBarIcon: ({ focused, color, size }) => {
            //function
            let iconName;
            let rn = route.name;

            //check the location
            if (rn === HomeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === ListssName) {
              iconName = focused ? "logo-buffer" : "logo-buffer";
            } else if (rn === MoreName) {
              iconName = focused
                ? "ellipsis-horizontal-circle-sharp"
                : "ellipsis-horizontal-circle";
            } else if (rn === AccountName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (rn === DiscovryName) {
              iconName = focused ? "compass" : "compass-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={28} color={"black"} />; //
          },
        })}
      >
        <Stack.Screen name={MoreName} component={More} />
        <Stack.Screen name={DiscovryName} component={Discovery} />

        <Stack.Screen name={HomeName} component={Home} />

        <Stack.Screen name={ListssName} component={Lists} />
        <Stack.Screen name={AccountName} component={Account} />
      </Stack.Navigator>
    
  );
}