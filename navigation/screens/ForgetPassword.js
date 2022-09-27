import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  Dimensions,
  ImageBackground,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {getAuth,sendPasswordResetEmail} from "firebase/auth";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgetPassword({navigation}) {
  function msg (error){
    switch (error.code){
           case "auth/invalid-email":
            error.code = "Wrong email address";
            break;
  
            case "auth/user-not-found":
              error.code= "There is no account for this email,try to register ";
              break;

              case "auth/network-request-failed":
                error.code= "No internet connection,Check your wifi.Try again";
                break;
  
            default:
            return error.code; 
          }
          return error.code;
      }
  const [Email, setEmail] = useState('');////////varible wrong

  return (
      <SafeAreaView
      style={{flex: 1, justifyContent: "center", backgroundColor: "#ffff" , alignItems: "center"}}
      >
        
        <View
        style={{
          width: "100%",
          height: 40,
          marginTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Icon
              name="arrow-back-outline"
              size={40}
              style={{ color: "black",  }}
              onPress={() => navigation.goBack()}
            />
      </View>
      
      

        <Text style={styles.title}>Forget password </Text>

        <View style={styles.container}>
          <TextInput
              style={styles.body}

              fontSize='15'
              placeholder="Enter your email"
              value={Email}
              onChangeText={text => setEmail(text)}
              underlineColorAndroid="transparent"
          />
        </View>


        <View style={styles.buttonCont}>
          <Button onPress={() => {
            if (!Email) {
              alert('Please enter email')
              return;
            }
            const auth = getAuth();
            sendPasswordResetEmail(auth, Email)
                .then(() => {
                  alert('Email sent, please check your email')
                })
                .catch((er) => {
                  er = msg(er);
                  alert(er);
              });

          }} title=' Reset Password ' fontSize='35' fontWeight='bold'
                  color="#ffff"
          >

          </Button>
        </View>

        </SafeAreaView>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    
    alignItems: 'center',
  },
  title: {

    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 150,
    
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },

  body: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    margin: 12,
    width: 350,
    paddingLeft: 20,
    paddingRight: 20,


  },
  buttonCont: {

    marginBottom: 160,
    padding: 5,
    width: 350,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#B1D8B7",
    borderColor: '#B1D8B7',

  },

});
