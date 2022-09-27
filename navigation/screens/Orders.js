import * as React from "react";
import { View, Text ,Image,TextInput,ScrollView,TouchableOpacity} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'
import Icon from "react-native-vector-icons/Ionicons";

export default function Orders({ navigation }) {
  return (
    <View style={{
      backgroundColor:"#FFF",
      flex:1
  }}> 
  
     <View style={{
         backgroundColor:"#84c89f",
         height:"18%",
         borderBottomLeftRadius:20,
         borderBottomRightRadius:20,
         paddingHorizontal:20,
         marginBottom:15
     }}>
         
         <Icon
              name="arrow-back-outline"
              size={40}
              style={{ color: "black", marginTop: 25,  }}
              onPress={() => navigation.goBack()}
            />
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:15,
                   width:"100%"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize:22,
                            color:"#FFF",
                            fontWeight:"bold"
                        }}>Your Orders</Text>
                        </View>
                   </View>

                   </View>
                 
               
            <View style={{
                   flexDirection:"row",
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
               }}>
                   <View style={{width:"100%"}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color:"#585a61"
                        }}>All Orders</Text>

                   </View>
                   
               </View>

               <ScrollView 
                    alignItems ="left"
                    showsVerticalScrollIndicator ={true}
                    style={{height:400}}
                >
                    <LinearGradient
                        colors={["rgba(0,164,109,0.2)", "transparent"]}
                        style={{
                            position:"absolute",
                            left:0,
                            right:0,
                            height:100,
                            width:'100%',
                            marginTop:220,
                            top:0
                        }}
                    />
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#edf7f1",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:330,
                        }}
                    >
     
                          <Image
                            
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingVertical:10
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                
                            }}> order </Text>
                         
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#edf7f1",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:330
                        }}
                    >
                          <Image
                            
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>order </Text>
                         
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Detail")}
                        style={{
                            height:250,
                            elevation:2,
                            backgroundColor:"#edf7f1",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius:15,
                            marginBottom:10,
                            width:330
                        }}
                    >
                          <Image
                            
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10
                        }}>
                            <Text style={{
                                fontWeight:"bold"
                            }}>order </Text>
                         
                        </View>
                    </TouchableOpacity>

                    
                </ScrollView> 
      </View>
     

  );
}