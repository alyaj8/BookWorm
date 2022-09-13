import * as React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import ViewRequest from "./ViewRequest";
import Discovery from "./Discovery";
import AdminAccount from "./AdminAccount";
import More from "./More";

//Screen names
const ViewRequest1 = "Requests";

const addbook1 = "AddBook";

const MoreName = "More";

const DiscovryName2 = "Discovery";
const AccountName2 = "Account";

const Tab = createBottomTabNavigator();
//export default Maincontainer;
export default function Maincontainer() {
  return (
    //for bottom navigation
    <NavigationContainer>
      <Tab.Navigator
        //   initialRouteName={HomeName} //to go to the first screen
        screenOptions={({ route }) => ({
          //route means the location u r at

          tabBarIcon: ({ focused, color, size }) => {
            //function
            let iconName;
            let rn = route.name;

            //check the location
            if (rn === ViewRequest1) {
              iconName = focused ? "file-tray-full" : "file-tray-full-outline";
            } else if (rn === addbook1) {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (rn === MoreName) {
              iconName = focused
                ? "ellipsis-horizontal-circle-sharp"
                : "ellipsis-horizontal-circle";
            } else if (rn === AccountName2) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (rn === DiscovryName2) {
              iconName = focused ? "compass" : "compass-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={28} color={"black"} />; //
          },
        })}
      >
        <Tab.Screen name={MoreName} component={More} />
        <Tab.Screen name={DiscovryName2} component={Discovery} />

        <Tab.Screen name={addbook1} component={ViewRequest} />

        <Tab.Screen name={ViewRequest1} component={ViewRequest} />
        <Tab.Screen name={AccountName2} component={AdminAccount} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
