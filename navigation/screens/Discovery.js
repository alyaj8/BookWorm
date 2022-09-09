import * as React from 'react';
import { View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default function Discovry({ navigation }) {
    return (
        <View style={{
            backgroundColor:"#FFF",
            paddingVertical:8,
            paddingHorizontal:20,
            marginHorizontal:20,
            borderRadius:15,
            marginTop:25,
            flexDirection:"row",
            alignItems:"center"
        }}>

<Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
            <TextInput
                 placeholder="Search by title or for a user"
                 placeholderTextColor="#b1e5d3"
                 style={{
                     fontWeight:"bold",
                     fontSize:18,
                     width:260
                 }}
            />
           
        </View> 
    );
}