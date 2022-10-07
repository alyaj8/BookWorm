import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Acc({ navigation }) {
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
      style={{
        backgroundColor: "#EDF5F0",
        flex: 1,
      }}
    >
      <View></View>
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
    borderColor: "green",
  },
  buttonCont: {
    width: 180,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 20,
    paddingLeft: 10,
    alignSelf: "center",
  },
  savechanges: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 18,
  },
});
