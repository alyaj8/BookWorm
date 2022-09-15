import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  ActivityIndicator,
  date,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";

function msg(error) {
  switch (error.code) {
    case "auth/invalid-email":
      error.code = "Wrong email address";
      break;

    case "auth/email-already-in-use":
      error.code =
        "The email is already registered try to login or use forgot password";
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
    <View style={styles.container}>
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
      <Text style={[styles.title, styles.leftTitle]}>Create a new account</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    margin: 12,
    width: 250,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonCont: {
    margin: 50,
    padding: 5,
    width: 250,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#00a46c",
    fontWeight: "bold",
  },
});
