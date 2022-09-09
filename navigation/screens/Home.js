import * as React from 'react';
import {  View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    Button,
Alert} from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons'

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
        

        <View>
        <ScrollView style={{  paddingTop: 15 }}  >
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 ,margin:5 }}>
             <Text style={{ fontSize: 24, fontWeight: '700',paddingHorizontal: 20 }}>
            WHO ARE WE?
                </Text>
<View style={{  flex:1, flexDirection:'row'}}>
                <Image  style={{ height: 200 ,width:200}}
 source={require('./description.jpg')}/>
                <Text style={{ fontSize: 10, fontWeight: '400',paddingTop: 10  ,flexDirection: 'row' }}>
                Who hates reading! {'\n'}
                 Half of this plant adores and loves reading. {'\n'}
                But what will happen to those used books that are no longer needed?{'\n'}
                 and how to make the reading community alive {'\n'}like it used to be in the past?.{'\n'}
                 Thats when Bookworm becomes handy.{'\n'}
    This platform helps readers by providing a space for sharing their list of favorite books to others along with the ability to search any book they desire and see the reviews.
                   Also,
                    {'\n'}they can know more about the book like who’s the author and where they can read/buy it.
                    {'\n'}Furthermore, Bookworm allows the users to sell their used books.
                     

                 </Text>
                 </View>
 

        </View>
        </ScrollView>

        </View>

 

        <View >
        <ScrollView  >
            <View style={{ flex: 1, backgroundColor: 'lightblue', paddingTop: 10,margin:5 }}>
             <Text style={{ fontSize: 24, fontWeight: '700',paddingHorizontal: 30 }}>
            YOU CANT FIND A SPCIFIC BOOK?
             </Text>

    
    
        <View style={styles.buttonCont} >
        <Button onPress={() => Alert.alert('Request Button pressed')}
        title="Request a book" 
        > 
        </Button>
        </View>
 
        </View>
        </ScrollView>

        </View>

         </SafeAreaView>
         
        );
       
}
 
const styles = StyleSheet.create({
    buttonCont:{
      marginLeft: 220,
       width: 250,
      borderWidth: 1,
      borderRadius:50,
      marginBottom:10,
      backgroundColor:"white",
      height:40,
      width:180,
   },
  
  });
  