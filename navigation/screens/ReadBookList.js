import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    FlatList,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
  } from "react-native";
  import { useState, useEffect } from "react";
  import {
    collection,
    query,
    orderBy,
    onSnapshot,
    setDoc,
    doc,
    getDoc,
    getDocs,
  } from "firebase/firestore";
  
  import Icon from "react-native-vector-icons/Ionicons";
  
  export default function ReadBookList({ navigation }) {
      
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground style={{flex: 1}} source={require("./222.jpg")} resizeMode="cover">
        <Icon
              name="arrow-back-outline"
              size={40}
              style={{ color: "black", marginTop: 30, marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
       
        </ImageBackground>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      height: "70%",
      width: "90%",
      borderRadius: 1,
      resizeMode: "stretch",
      justifyContent: "center",
      shadowColor: "black",
      shadowOpacity: 0.9,
      shadowOffset: {
        width: 2,
        height: 8,
      },
      alignSelf: "center",
  
      //alignItems: "center",
      // margin: 15,
    },
    oneBook: {
      //padding: 1,
      height: 130,
      justifyContent: "center",
      width: 350,
      backgroundColor: "lightgrey",
      borderRadius: 25,
      margin: 50,
      alignItems: "center",
    },
    card: {
      height: "90%",
      backgroundColor: "#EDF5F0",
      marginHorizontal: 10,
      borderRadius: 10,
      margin: 10,
      marginBottom: 30,
      padding: 10,
      borderColor: "#00a46c",
      borderWidth: 0.2,
    },
    categoryContainer: {
      flexDirection: "row",
      margin: 10,
      justifyContent: "space-between",
      flex: 1,
    },
    categoryText: { fontSize: 15, color: "grey", fontWeight: "bold" },
    categoryTextSelected: {
      color: "green",
      paddingBottom: 5,
      borderBottomWidth: 2,
    },
  });