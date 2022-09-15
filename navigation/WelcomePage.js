import React, { Component, useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

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

export default function WelcomePage({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
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
      console.log("uid", user.uid);
      console.log("user", docSnap.data());
      if (docSnap.data().isAdmin) {
        navigation.navigate("Adminpage");
      } else {
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

  return (
    <ScrollView>
      <ImageBackground
        source={require("./screens/111.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{ paddingHorizontal: 25, marginTop: 350 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
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
              onChangeText={(text) => setValue({ ...value, email: text })}
              underlineColorAndroid="transparent"
              value={value.email}
            />

            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => setValue({ ...value, password: text })}
              underlineColorAndroid="transparent"
              value={value.password}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text
                style={{
                  color: "#2F5233",
                  fontWeight: "700",
                  marginBottom: 5,
                  textDecorationLine: "underline",
                }}
              >
                Forget password?
                {"\n"}
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
            <TouchableOpacity onPress={() => navigation.navigate("UserSignUp")}>
              <Text
                style={{
                  color: "#2F5233",
                  fontWeight: "700",
                  textDecorationLine: "underline",
                }}
              >
                Register
                {"\n"}
                {"\n"} {"\n"}
                {"\n"}
                {"\n"} {"\n"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

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
