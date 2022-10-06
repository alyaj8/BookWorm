import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect } from "react";
import {
  Image,
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { withUser } from "../config/UserContext";

function msg(error) {
  switch (error.code) {
    case "auth/invalid-email":
      error.code = "Wrong email address";
      break;

    case "auth/user-not-found":
      error.code =
        "There is no account for this email,you have to register first";
      break;

    case "auth/wrong-password":
      error.code = "Password is not correct";
      break;
    case "auth/too-many-requests":
      error.code = "You have exceeded the attempts limit, try again later";
      break;

    default:
      return error.code;
  }
  return error.code;
}

function WelcomePage({ navigation, isAdmin, setIsAdmin }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const navForgetPassword = (val) => {
    setValue({
      email: "",
      password: "",
      error: "",
    });

    navigation.navigate("ForgetPassword");
  };
  const navSignUP = (val) => {
    setValue({
      email: "",
      password: "",
      error: "",
    });
    navigation.navigate("UserSignUp");
  };

  // const UserSignUp = "UserSignUp";
  const auth = getAuth();

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const db = getFirestore();
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // console.log("uid", user.uid);
      // console.log("user", docSnap.data());
      setValue({
        email: "",

        password: "",

        error: "",
      });
      if (docSnap.data().isAdmin) {
        setIsAdmin(true);
        navigation.navigate("Adminpage");
      } else {
        setIsAdmin(false);
        navigation.navigate("Maincontainer");
      }
    } catch (er) {
      er = msg(er);
      setValue({
        ...value,
        error: er,
      });
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs([
      "Warning: Async Storage has been extracted from react-native core",
    ]);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#ffff" }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 250, width: 250 }}
            source={require("./BookWorm.jpg")}
          />
        </View>

        <Text
          style={{
            fontSize: 35,
            textDecoration:"underline",
            fontWeight: "500",
            color: "#333",
            marginBottom: 15,
          }}
        >
          Log In
        </Text>
        <Text style={{ color: "red" }}>{value?.error}</Text>
        <View>
          <TextInput
            style={styles.body}
            placeholder="E-mail"
            onChangeText={(text) =>
              setValue({ ...value, email: text, error: "" })
            }
            underlineColorAndroid="transparent"
            value={value.email}
          />

          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) =>
              setValue({ ...value, password: text, error: "" })
            }
            underlineColorAndroid="transparent"
            value={value.password}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => navForgetPassword(value)}>
            <Text
              style={{
                color: "#2F5233",
                fontWeight: "700",
                marginBottom: 5,
                textDecorationLine: "underline",
              }}
            >
              Forget password?
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={signIn}
            style={{
              backgroundColor: "#00a46c",
              padding: 20,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#ffff",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navSignUP(value)}>
            <Text
              style={{
                color: "#2F5233",
                fontWeight: "800",
                textDecorationLine: "underline",
              }}
            >
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withUser(WelcomePage);

const styles = StyleSheet.create({
  body: {
    borderWidth: 1,
    width: "100%",
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
});
