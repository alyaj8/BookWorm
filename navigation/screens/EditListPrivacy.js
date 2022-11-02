import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState ,useEffect} from "react";
  import Icon from "react-native-vector-icons/Ionicons";
  import { AirbnbRating, Rating } from "react-native-ratings";
  import {
    collection,
    doc,
    getFirestore,
    setDoc,
    addDoc,
    query,
    where,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { Dropdown } from 'react-native-element-dropdown';
  import { db } from "../../config/firebase";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  export default function EditListPrivacy({ navigation }) {
const [PrivacyOption, setPrivacyOption] = useState(0);
let [CustomeList, setCustomeLists] = useState([]);
const Datacat = (str, num) => {
  if (str.length > num) {
    return str.substring(0, num) + "...";
  }
  return str;
};
let GetAddList = async () => {
  setCustomeLists([]);

  try {
    let lists = [];
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      const db = getFirestore();
      console.log(user.uid);
      const q = query(
        collection(db, "CustomLists"),
        where("List_user_mail", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        lists = [];
        querySnapshot.forEach((doc) => {
          let list = doc.data();
          console.log(list);
          lists.push(list);
        });
        setCustomeLists(lists);
      } else {
        setCustomeLists([]);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  
  GetAddList();
}, []); 
    return (
      <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Icon
                name="arrow-back-outline"
                size={40}
                style={{ color: "white" }}
                onPress={() => navigation.goBack()}
              />
             <Text style={styles.bookTitle}>
              
                Edit Lists Privacy
              </Text>
            </View>
  
            <View style={styles.bottomView}>
            
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
              marginTop:30,
              marginLeft:30,
              marginBottom:30,
            }}
          >
           Read Book List
          </Text>
          <MaterialIcons
              name="lock"
              size={30}
              style={{
                color: "black",
                position:"absolute",
                right:60,
                marginTop:20,
              }}
              onPress={() => {
                navigation.navigate("EditListPrivacy");
                
              }}
            />
             
            </View>

            <View style={styles.bottomView}>
            
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
                marginTop:30,
                marginLeft:30,
                marginBottom:30,
              }}
            >
             Favorite List
            </Text>
            <MaterialIcons
                name="lock-open"
                size={30}
                style={{
                  color: "black",
                  position:"absolute",
                  right:60,
                  marginTop:20,
                }}
                onPress={() => {
                  navigation.navigate("EditListPrivacy");
                  
                }}
              />
              </View>
  
              <View style={styles.bottomView}>
            
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
                marginTop:30,
                marginLeft:30,
                marginBottom:30,
              }}
            >
            Wish List
            </Text>
            <MaterialIcons
                name="lock-open"
                size={30}
              
                style={{
                  color: "black",
                  position:"absolute",
                  right:60,
                  marginTop:20,
                }}
                onPress={() => {
                  navigation.navigate("EditListPrivacy");
                  
                }}
              />

              </View>

              {CustomeList.length > 0 ? (
               CustomeList.map((val, ind) => (
            <View key={ind} style={styles.bottomView}>

              <Text
              style={{
                fontWeight: "bold",
                fontSize: 17,
                color: "#585a61",
                marginTop:30,
                marginLeft:30,
                marginBottom:30,
              }}
            >
            {Datacat(val.ListName, 20)}
            </Text>
            <MaterialIcons
              name={val.privacy?"lock":"lock-open"}
              size={30}
              style={{
                color: "black",
                position:"absolute",
                right:60,
                marginTop:20,
              }}
              onPress={() => {
              }}
            />
            </View>
          ))
        ):(<SafeAreaView></SafeAreaView>)}
  

          </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: "2%",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginTop: 10,
      backgroundColor: "#00a46c",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingHorizontal: 20,
    },
    bookTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "white",
      marginLeft: 10,
    },
    bottomView: {
      backgroundColor: "white",
      marginTop: 20,
      shadowColor: "#000",
      flexDirection: "row",
       marginTop: 25,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginHorizontal: 10,
    },
    review: {
      // backgroundColor: "White",
      width: "90%",
      borderRadius: 10,
      textAlignVertical: "top",
      borderWidth: 1,
      alignSelf: "center",
      padding: 10,
      marginTop: 10,
    },
    DDsyleC:{ 
    backgroundColor: 'white',
    padding: 16,
    marginTop:20,
    borderColor: 'black',},
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontWeight: "bold",
        fontSize: 17,
        color: "#585a61",
      },
      placeholderStyle: {
        fontWeight: "bold",
        fontSize: 17,
        color: "#585a61",
      },
      selectedTextStyle: {
        fontSize: 16,
        marginTop:10,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
  });
  