import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native'; 


export default function () {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Forget password </Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          placeholder="Old Password"
          
          
          underlineColorAndroid="transparent"
        />
      </View>
      

      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="New Password"
         // onChangeText={setPassword} comment
          
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.body}
          secureTextEntry={true}
          placeholder="Confirm Password"
        
          
          underlineColorAndroid="transparent"
        />
      </View>
     
      
      <View style={styles.buttonCont} >
        <Button title=' Set new password '  color="black"
         > 
      </Button>
      </View>
      
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    backgroundColor:'whiteghost',
    justifyContent:'center',
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
