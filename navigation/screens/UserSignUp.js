import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
} from 'react-native'; 
import Axios from 'axios';

const register = () => {
    Axios.post('https://http://localhost12555/register', {
        first_name: firstnameReg,
        last_name: lastnameReg,
        username : usernameReg,
        email : emailReg,
        password: passwordReg,  
    }).then((response) => {
        console.log(response);
    })
}


const [firstnameReg, setFirstnameReg] = useState('')
const [lastnameReg, setLastnameReg] = useState('')
const [usernameReg, setUsernameReg] = useState('')
const [passwordReg, setPasswordReg] = useState('')
const [emailReg, setEmailReg] = useState('')

export default function  () {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.leftTitle]}>Create a new account</Text>
      <View style={styles.InputContainer}>
      <TextInput
      style={styles.body}
        placeholder="First Name"
        underlineColorAndroid="transparent"
        onChange={() => {
            setFirstnameReg(e.target.value); 
        }}
      />
    </View>
    <View style={styles.InputContainer}>
      <TextInput
      style={styles.body}
        placeholder="Last Name"
       
        underlineColorAndroid="transparent"
        onChange={() => {
            setLastnameReg(e.target.value); 
        }}
      />
    </View>
    <View style={styles.InputContainer}>
      <TextInput
      style={styles.body}
        placeholder="Username"
        underlineColorAndroid="transparent"
        onChange={() => {
            setUsernameReg(e.target.value); 
        }}
      />
    </View>

    <View>
   /////////////////////////////
    </View>

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="E-mail or  Username"
          onChange={() => {
            setEmailReg(e.target.value); 
        }}
          
          underlineColorAndroid="transparent"
        />
      </View>
      

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Password"
          onChange={() => {
            setPasswordReg(e.target.value); 
        }}
          
          underlineColorAndroid="transparent"
        />
      </View>
     
      
      <View style={styles.buttonCont} >
        <Button  onClick={register} title='SignUp'  color="black"
       
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
