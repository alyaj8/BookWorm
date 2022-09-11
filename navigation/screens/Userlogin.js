import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function Userlogin({ navigation }) {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })
  const auth = getAuth();
  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      alert("User Loged IN")
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Log In</Text>
      <Text style={{ color: 'red' }}>{value?.error}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or  Username"
          //onChangeText={setEmail} comment
          onChangeText={(text) => setValue({ ...value, email: text })}
          underlineColorAndroid="transparent"
        />
      </View>


      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          // onChangeText={setPassword} comment
          onChangeText={(text) => setValue({ ...value, password: text })}
          underlineColorAndroid="transparent"
        />
      </View>
      <View  >
        <Button title=' Forget password' color="black" >
        </Button>
      </View>

      <View style={styles.buttonCont} >
        <Button onPress={signIn} title='Log in' color="black"
        //onPress={() => onPressLogin()} //
        >
        </Button>
      </View>

    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {

    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  /*loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },*/
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
