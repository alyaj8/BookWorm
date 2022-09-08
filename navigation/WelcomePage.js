import React, { Component } from 'react';
import { Button, StyleSheet, View,Image ,Text} from 'react-native';
import Userlogin  from './screens/Userlogin' ;
import { NavigationContainer , navigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Userlogin}
        />
        <Stack.Screen name="SignUp" component={UserSignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{marginLeft:40}} source={require('./PHOTO-2022-09-06-21-56-03.jpg')}/>
      
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            color="black"
            onPress={() =>
                navigation.navigate('Userlogin')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
          title="SignUp"
          color="black"
            onPress={() =>
                navigation.navigate('UserSignUp')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
    padding:20,
    backgroundColor:"#C6E7DD",
    borderRadius: "12px",
  }
 
});
