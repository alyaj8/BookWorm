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

export default function UserSignUp({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  const auth = getAuth();
  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      alert("User Created please Login");
      navigation.navigate("WelcomePage");
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create a new account</Text>
      <Text style={{ color: "red" }}>{value?.error}</Text>

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="First Name"
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
          underlineColorAndroid="transparent"
        />
      </View>

      <View></View>

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or  Username"
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
    backgroundColor: "#C6E7DD",
  },
});
