import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import DiscoveryStack from "../StackNavigator";

// Screens
import AddBookTest from "./AddBookTest";
import AdminAccount from "./AdminAccount";
import BookInfoApi from "./BookInfoApi";
import Discovery from "./Discovery";
import More from "./More";
import ViewRequest from "./ViewRequest";
//Screen names
const AddBookTest1 = "AddManually";

const addbook1 = "AddBook";

const MoreName = "More";

const DiscovryName2 = "Discovery";
const AccountName2 = "Account";

const Tab = createBottomTabNavigator();
//export default Maincontainer;

const Stack = createNativeStackNavigator();

const AddBookStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"addbook1"}
    >
      <Stack.Screen name={"addbook1"} component={ViewRequest} />
      <Stack.Screen name="BookInfoApi" component={BookInfoApi} />
    </Stack.Navigator>
  );
};

const DiscovryStack = ({ navigation, route }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"DiscovryName2"}
    >
      <Stack.Screen name={"DiscovryName2"} component={Discovery} />
      <Stack.Screen name="BookInfoApi" component={BookInfoApi} />
    </Stack.Navigator>
  );
};

export default function Maincontainer() {
  return (
    //for bottom navigation
    <Tab.Navigator
      //   initialRouteName={HomeName} //to go to the first screen
      screenOptions={({ route }) => ({
        //route means the location u r at

        tabBarIcon: ({ focused, color, size }) => {
          //function
          let iconName;
          let rn = route.name;

          //check the location
          if (rn === AddBookTest1) {
            iconName = focused ? "create":"add-circle-outline";
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
      <Tab.Screen name={DiscovryName2} component={DiscovryStack} />

      <Tab.Screen name={addbook1} component={AddBookStack} />

      <Tab.Screen name={AddBookTest1} component={AddBookTest} />
      <Tab.Screen name={AccountName2} component={AdminAccount} />
    </Tab.Navigator>
  );
}
