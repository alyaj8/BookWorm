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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
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
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "12%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
          marginBottom: 15,
        }}
      >
        <Icon
          name="arrow-back-outline"
          size={45}
          style={{ color: "black", marginTop: 35, marginLeft: -15 }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: -10,
            width: "100%",
          }}
        >
          <Text
            style={{
              marginLeft: 79,
              marginTop: -35,
              fontSize: 29,
              color: "#FFF",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            My detailes
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFF",
          height: "80%",
          borderRadius: 50,
          paddingHorizontal: 20,
          marginBottom: 15,
          marginTop: 15,
        }}
      >
        <View style={{ marginTop: 40, marginLeft: -10 }}>
          <View style={styles.InputContainer}>
            <Text style={{ fontWeight: "bold" }}>First Name</Text>
            <TextInput
              style={styles.body}
              placeholder="First Name"
              onChangeText={(text) => setValue({ ...value, firstname: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={{ fontWeight: "bold" }}>{"\n"}Last Name</Text>

            <TextInput
              style={styles.body}
              placeholder="Last Name"
              nChangeText={(text) => setValue({ ...value, lastname: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={{ fontWeight: "bold" }}>{"\n"}User Name</Text>

            <TextInput
              style={styles.body}
              placeholder="Username"
              onChangeText={(text) => setValue({ ...value, username: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={{ fontWeight: "bold" }}>{"\n"}Email</Text>

            <TextInput
              style={styles.body}
              placeholder="E-mail"
              onChangeText={(text) => setValue({ ...value, email: text })}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={{ fontWeight: "bold" }}>{"\n"}Password</Text>

            <TextInput
              style={styles.body}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(text) => setValue({ ...value, password: text })}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.buttonCont}>
            <TouchableOpacity>
              <Text style={styles.savechanges}>Save changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
