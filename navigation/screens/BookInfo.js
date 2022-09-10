import React from "react"
//import styled from "styled-component"
import {Text, StyleSheet,Image,View, Button} from "react-native"

/*const express=require('express');
const bodyParser=require('body-parser');
const mysql =require('mysql');

const connection =mysql.createConnection( {
    HOST: "bookworm.a2hosted.com",
    USER: "bookwor2_admin",
    PASSWORD: "YTCwUarK_fuL",
    DB: "bookwor2_main",
  });*/
  

 export default function book() {
  return (<View style={{alignItems:"center", flex:1, justifyContent:"center", margintop:100}}>
   <View> 
        
   </View>
    <View style={{backgroundColor:"#C6E7DD", borderRadius:25 ,width:390, height:560,}}>
    <Text style={{flew:1,alignItems:"center",justifyContent:"center", paddingTop:20,paddingLeft:10 ,paddingRight:10}}>Who Moved My Cheese? </Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> by Spencer Johnson</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> _________________________________________________________</Text>
    <Text style={{alignItems:"center",justifyContent:"center", paddingTop:10,paddingLeft:10 ,paddingRight:10}}>Review: </Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> _________________________________________________________</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> Your review of the book:</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> leave your comments and read other’s:</Text>
    <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}> _________________________________________________________</Text>
        <Text style={{alignItems:"center",justifyContent:"center", paddingTop:20,paddingLeft:10 ,paddingRight:10}}>Description:</Text>
        <Text style={{alignItems:"center",justifyContent:"center",paddingLeft:10 ,paddingRight:10}}>
                An Amazing Way to Deal with Change in Your Work and in Your Life, 
                published on September 8, 1998, is a bestselling seminal work and 
                motivational business fable by Spencer Johnson. The text describes 
                the way one reacts to major change in one's work and life, and four 
                typical reactions to those changes by two mice and two "Littlepeople", 
                during their hunt for "cheese".
        </Text>
       
        <Text style={{alignItems:"center",justifyContent:"center", paddingTop:20,paddingLeft:10 ,paddingRight:10}}>ISBN: 9780399144462</Text>
        <View style={styles.fixToText}>
            <Button title="Add to:" color="lightgrey" />
       </View>
       <View style={styles.fixToText}> 
            <Button title="Buy now" color="lightgrey" />
       </View>
    </View>
  </View>
  
  );
  
 }
//<Button title="Add to:" color="lightgrey" />
 /*const ret =express();
 ret.get('/Book', function(req,res){
    connection.getConnection(function(err,connection){
        connection.query('SELECT Description FROM Book',function(error,result,fields){
            if (error) throw ErrorEvent;
            res.send(result)
        });
    });
 });
 ret.listen(3000,()=>{
    console.log('Go to http://localhost:3000/users so you can see the data.');
 });*/
 //export default App;

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
    },
    fixToText: {
        marginTop: 12,
        marginRight:-80,
        width: 280,
        justifyContent: 'center',
        alignContent:"center"
    }
   
  });
