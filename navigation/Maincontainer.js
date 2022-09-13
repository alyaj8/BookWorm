import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

const Tab = createBottomTabNavigator();
//export default Maincontainer;
export default function Maincontainer() {
  return (
    //for bottom navigation
    <NavigationContainer>
      <Tab.Navigator
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
        tabBarOptions={{
          //to costmize the bar
          activeTintColor: "black",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70 },
        }}
      >
        <Tab.Screen name={MoreName} component={More} />
        <Tab.Screen name={DiscovryName} component={Discovery} />

        <Tab.Screen name={HomeName} component={Home} />

        <Tab.Screen name={ListssName} component={Lists} />
        <Tab.Screen name={AccountName} component={Account} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
