import * as React from "react";

import Orders from "./navigation/screens/Orders";
import BookInfo from "./navigation/screens/BookInfo";
import UserSignUp from "./navigation/screens/UserSignUp";
import WelcomePage from "./navigation/WelcomePage";
import ForgetPassword from "./navigation/screens/ForgetPassword";
import Home from "./navigation/screens/Home";
import Bookpdf from "./navigation/screens/Bookpdf";
import Acc from "./navigation/screens/Acc";
import Changepass from "./navigation/screens/Changepass";
import Editbook from "./navigation/screens/Editbook";
import BookInfoApi from "./navigation/screens/BookInfoApi";
import Discovery from "./navigation/screens/Discovery";
import RecViewall from "./navigation/screens/RecViewall";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import "firebase/auth";
import Maincontainer from "./navigation/Maincontainer";
import Adminpage from "./navigation/screens/Adminpage";
import RatedViewAll from "./navigation/screens/RatedViewAll";
import ReadBookList from "./navigation/screens/ReadBookList";
import FavoriteList from "./navigation/screens/FavoriteList";
import WishList from "./navigation/screens/WishList";
import StripeApp from "./navigation/screens/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProvider } from "./config/UserContext";
import ReviewBook from "./navigation/screens/Reviewbook";
import BookComment from "./navigation/screens/BookComment";
import * as Notifications from "expo-notifications";
import Commentadmin from "./navigation/screens/Commentadmin";
import CreateCustomList from "./navigation/screens/CreateCustomList";
const firebaseConfig = {
  apiKey: "AIzaSyCb8vT5-UmFZV-954feGAE2L0-T4Tgpqhs",
  authDomain: "group16-de98b.firebaseapp.com",
  projectId: "group16-de98b",
  storageBucket: "group16-de98b.appspot.com",
  messagingSenderId: "19414542563",
  appId: "1:19414542563:web:460d20dd6abdeabef47dd6",
  measurementId: "G-F5B7J7EDXR",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export const Stack = createNativeStackNavigator();
initializeApp(firebaseConfig);

const PUBLISHABLE_KEY =
  "pk_test_51Ll5efFetd1JSL8vQ1WpbGvxBewQSJi8ZUzB6WD0i19CUUkzdnaHAQzja4LNFMZpUWAZKUPTdSklL2KZSI1k9Qfy00MZ31WOSr";
function App() {
  // hide logbox warning
  React.useEffect(() => {
    LogBox.ignoreLogs([
      "Warning: Async Storage has been extracted from react-native core",
    ]);
  }, []);
  return (
    <UserProvider>
      <StripeProvider publishableKey="pk_test_51Ll5efFetd1JSL8vQ1WpbGvxBewQSJi8ZUzB6WD0i19CUUkzdnaHAQzja4LNFMZpUWAZKUPTdSklL2KZSI1k9Qfy00MZ31WOSr">
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
            <Stack.Screen name="ReadBookList" component={ReadBookList} />
            <Stack.Screen name="FavoriteList" component={FavoriteList} />
            <Stack.Screen name="WishList" component={WishList} />
            <Stack.Screen name="BookComment" component={BookComment} />
            <Stack.Screen name="StripeApp" component={StripeApp} />
            <Stack.Screen name="Bookpdf" component={Bookpdf} />
            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="ReviewBook" component={ReviewBook} />
            <Stack.Screen name="Acc" component={Acc} />
            <Stack.Screen name="RatedViewAll" component={RatedViewAll} />
            <Stack.Screen name="Changepass" component={Changepass} />
            <Stack.Screen name="Editbook" component={Editbook} />
            <Stack.Screen name="BookInfoApi" component={BookInfoApi} />
            <Stack.Screen name="Commentadmin" component={Commentadmin} />
            <Stack.Screen name="Discovery" component={Discovery} />
            <Stack.Screen name="RecViewall" component={RecViewall} />
            <Stack.Screen name="CreateCustomList" component={CreateCustomList}/>
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </UserProvider>
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
