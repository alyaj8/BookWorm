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
import BookInfo  from './src/component/BookInfo' ;
import { NavigationContainer , navigation} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BookInfo"
          component={BookInfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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

        <View  style={{ alignItems: 'center',backgroundColor:"#fff",}}>
        <TouchableOpacity style={styles.oneBook}>
         <Text>here bookInfo 1!</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.oneBook}>
        <Text>here bookInfo 2!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneBook}>
        <Text>here bookInfo 3!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneBook} 
        onPress={() => {
          navigation.navigate('BookInfo');
        }}>
        <Text>here bookInfo 4!</Text>
        </TouchableOpacity>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    margin:15, 
    
  },
  oneBook:
  {
    height:150,
    justifyContent:"center",
    width:370,
    backgroundColor:"#b1e5d3",
    borderRadius:25,
    margin:5,
    alignItems: 'center',
    
    
    
  }
});
