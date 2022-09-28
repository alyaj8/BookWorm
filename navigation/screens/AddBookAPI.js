import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  View,
  ImageBackground,
  Alert,
  TextTrack,
  ActivityIndicator,
  date,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {collection, doc, getFirestore, setDoc,firestore } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";
import fetch from "node-fetch";
import searchBook from "./searchBook";
 


export default function AddBookAPI(){
    return(
            <ScrollView>
                <Image
                        style={{ height: "100%", width: "100%" , position:"absolute" }}
                        source={require("../screens/222.jpg")}
                    />
                <View style={styles.container}>
                
                <View
                    style={{
                    width: "100%",
                    height: 40,
                    paddingHorizontal: 20,
                    }}
                >
                    <Text style={{ fontSize: 22 }} onPress={() => navigation.goBack()}>
                    Back
                    </Text>
                </View>
                <Text style={[styles.title, styles.leftTitle]}>Add new Book</Text>
                <Text style={{ color: "red" }}>{value?.error}</Text>

                <View style={styles.InputContainer}>
                <View style={{alignItems:'center'}}>
                        <TouchableHighlight onPress={() => pickImage()}>
                            <View style={{alignItems:"center"}} 
                            onChangeText={(text) => setValue({ ...value, poster: URL })}>
                            <Entypo name="images" size={24} color="#576F72" />
                            
                            <Text style={{ alignContent:'center'}} >the book's poster</Text>
                            </View>
                        </TouchableHighlight>

                </View>
                <View style={styles.InputContainer}>
                    <Text style={styles.textD}>Description</Text>
                    <TextInput
                    multiline = {true}
                    
                    style={styles.body}
                    //placeholder="Last Name"
                    onChangeText={(text) => setValue({ ...value, Description: text })}
                    underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.buttonCont}>
                    <Button 
                    
                    title="Add Book"
                    color="#B1D8B7"
                    onPress={() => searchBook()} //
                    ></Button>
                </View>
                
                </View>
                </View>
                </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    alignSelf:'center',
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    margin: 12,
    width: 350,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf:'center'
  },
  buttonCont: {
    margin: 20,
    padding: 5,
    width: 250,
    alignSelf:'center',
    borderRadius: 50,
    //backgroundColor: "#B1D8B7",
  },
  InputContainer:
  {
    fontSize: 50,
  
  },
  textD:{
    marginLeft:40,
  }
});