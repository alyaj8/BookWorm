import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  ActivityIndicator,
  date,
} from 'react-native'; 


export default function  () {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create a new account</Text>
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

    <View>
   /////////////////////////////
    </View>

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or  Username"
          //onChangeText={setEmail} comment
          
          underlineColorAndroid="transparent"
        />
      </View>
      

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
         // onChangeText={setPassword} comment
          
          underlineColorAndroid="transparent"
        />
      </View>
     
      
      <View style={styles.buttonCont} >
        <Button title='SignUp'  color="black"
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
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
    
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderRadius:50,
    padding: 10,
    margin: 12,
    width: 250,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    
  },
  buttonCont:{
    
    margin: 50,
    padding:5,
    width: 250,
    borderWidth: 1,
    borderRadius:50,
    backgroundColor:"#C6E7DD",
    
  },

});