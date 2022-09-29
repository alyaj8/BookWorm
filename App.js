import * as React from "react";
import { LogBox } from "react-native";
import Bookpdf from "./navigation/screens/Bookpdf";
import Orders from "./navigation/screens/Orders";
import UserSignUp from "./navigation/screens/UserSignUp";
import WelcomePage from "./navigation/WelcomePage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { initializeApp } from "firebase/app";
import "firebase/auth";
import Maincontainer from "./navigation/Maincontainer";
import Adminpage from "./navigation/screens/Adminpage";
import BookInfo from "./navigation/screens/BookInfo";
import ForgetPassword from "./navigation/screens/ForgetPassword";
import ReadBookList from "./navigation/screens/ReadBookList";
import StripeApp from "./navigation/screens/StripeApp";
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
          <Stack.Screen name="StripeApp" component={StripeApp} />
          <Stack.Screen name="Bookpdf" component={Bookpdf} />
          <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
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
