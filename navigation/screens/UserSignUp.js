import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  date,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

function msg(error) {
  switch (error.code) {
    case "auth/invalid-email":
      error.code = "Wrong email address";
      break;

    case "auth/email-already-in-use":
      error.code =
        "The email is already registered try to login or use forgot password";
      break;

    case "auth/weak-password":
      error.code = "week password";
      break;

    default:
      return error.code;
  }
  return error.code;
}
export default function UserSignUp({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    error: "",
  });
  const auth = getAuth();
  async function signUp() {
    if (
      value.firstname === "" ||
      value.email === "" ||
      value.username === "" ||
      value.password === ""
    ) {
      setValue({
        ...value,
        error: " First name, username, Email and password are mandatory.",
      });
      return;
    }
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      console.log("user", user.uid);
      const db = getFirestore();
      const data = {
        email: value.email,
        username: value.username,
        firstname: value.firstname,
        lastname: value.lastname,
        password: value.password,
        isAdmin: false,
      };
      await setDoc(doc(db, "users", user.uid), data);
      alert("User Created please Login");
      navigation.navigate("WelcomePage");
    } catch (er) {
      er = msg(er);
      setValue({
        ...value,
        error: er,
      });
      console.log(er);
    }
  }
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", backgroundColor: "#ffff" }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: 40,
            paddingHorizontal: 20,
          }}
        >
          <Icon
            name="arrow-back-outline"
            size={40}
            style={{ color: "black" }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: 150, width: 150 }}
            source={require("../BookWorm.jpg")}
          />
        </View>
        <Text style={[styles.title]}>Create a new account</Text>
        <Text style={{ color: "red" }}>{value?.error}</Text>

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="First Name"
            onChangeText={(text) => setValue({ ...value, firstname: text })}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Last Name"
            nChangeText={(text) => setValue({ ...value, lastname: text })}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Username"
            onChangeText={(text) => setValue({ ...value, username: text })}
            underlineColorAndroid="transparent"
          />
        </View>

        <View></View>

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="E-mail"
            onChangeText={(text) => setValue({ ...value, email: text })}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setValue({ ...value, password: text })}
            underlineColorAndroid="transparent"
          />
        </View>

        <View style={styles.buttonCont}>
          <Button
            title="SignUp"
            color="black"
            onPress={() => signUp()} //
          ></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignItems: "left",
    justifyContent: "left",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 12,
    width: 350,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonCont: {
    margin: 50,
    padding: 5,
    width: 250,
    borderRadius: 10,
    backgroundColor: "#B1D8B7",
  },
});
