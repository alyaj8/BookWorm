import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView,Button } from 'react-native';
import Fetch from './src/Fetch';
//import {userSate,userEffect} from "react";
//import{collection, query,orderBy,onSanpshot,setDoc,doc,getDoc,getDocs} from "firebase/firestore";
//import{db} from "../../config/firebase";
export default function book() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{paddingTop:70, alignItems:"center", }}>
     
      <View style={{backgroundColor:'lightgray', alignItems:"center" ,height:212, width:143 , justifyContent:"center",}}>
      <Text style={{height:20}}>book Poster here</Text>
      </View>
      <View style={{ borderRadius:25 , height:560,}}>
      <View style={{padding:10, justifyContent:"center", alignItems:"center"}}>
      <Fetch/>
        <View style={styles.fixToText}>
            <Button title="Add to:" color="lightgrey" />
       </View>
       <View style={styles.fixToText}> 
            <Button title="Buy now" color="lightgrey" />
       </View>
      </View>
        <StatusBar style="auto" />
      </View>
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  fixToText: {
    marginTop: 12,
    width: 280,
    justifyContent: 'center',
    alignContent:"center"
}
});





import {View , Text, FlatList, StyleSheet, Pressable} from 'react-native'
import React, {useState,useEffect} from 'react'
import {firebase} from '../config';

const Fetch = () => {

    const [users , setUsers] = useState([]);
    const bookRef = firebase.firestore().collection('Book');

    useEffect(async () => {
        bookRef
        .onSnapshot(
            querySnapshot => {
                const users =[]
                querySnapshot.forEach((doc) =>{
                    const {Description, ISBN, author, category, location, poster, title}= doc.data()
                    users.push({
                        id: doc.id,
                        Description,
                        ISBN,
                        author,
                        category,
                        location,
                        poster,
                        title
                    })
                })
                setUsers(users)
            }
        )

    },[])



    return(
        <View style={{ flex:1, marginTop:100}}>
           <FlatList
                style={{height:'100%'}}
                data={users}
                numColumns={1}
                renderItem={({item}) => (
                    <Pressable style={styles.container}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>{item.poster}</Text>
                            <Text style={styles.itemHeading}>{item.title}</Text>
                            <Text style={styles.itemHeading}>{item.author}</Text>
                            <Text style={styles.itemHeading}>{item.category}</Text>
                            <Text style={styles.itemHeading}>{item.Description}</Text>
                            <Text style={styles.itemHeading}>{item.ISBN}</Text>

                        </View>

                    </Pressable>  
                )}
           />
        </View>
    )
}
export default Fetch;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5',
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10,   
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column'
    },
    itemHeading:{
        fontWeight:'bold'
    },
    itemText:{
        fontWeight:'300'
    }
})
