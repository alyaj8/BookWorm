import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/Ionicons";
  import { AirbnbRating, Rating } from "react-native-ratings";
  import { doc, updateDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import { Dropdown } from 'react-native-element-dropdown';
  import { db } from "../../config/firebase";
  export default function CreateCustomList({ navigation }) {

    const [PrivacyOption, setPrivacyOption] = useState(0);
    const [ListName ,setListName] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    const data = [
        { label: 'Private List', value: '1' },
        { label: 'Public List', value: '2' },
      ];
    
        const renderLabel = () => {
          if (PrivacyOption || isFocus) {
            return (
              <Text style={[styles.label, isFocus && { color: "#00a46c" }]}>
               Privacy Options
              </Text>
            );
          }
          return null;
        };
    return (
      <SafeAreaView>
   
          <View style={styles.container}>
            <View style={styles.header}>
              <Icon
                name="arrow-back-outline"
                size={40}
                style={{ color: "white" }}
                onPress={() => navigation.goBack()}
              />
             <Text style={styles.bookTitle}>
              
                Create Custom List
               
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
            }}
          >
            List name
          </Text>
              <TextInput
                style={styles.review}
                placeholder="Write the name of your new custom list."
                onChangeText={(text) => setListName(text)}
              />
        <View style={styles.DDsyleC}>
        {renderLabel()}
        <Dropdown
          borderColor= "black"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select privacy options' : '...'}
          value={PrivacyOption}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPrivacyOption(item.value);
            setIsFocus(false);
          }}
         
        />
      </View>

            
              <TouchableOpacity
                style={{
                  borderRadius: 25,
                 backgroundColor: "#00a46c",
                  width: "48%",
                  alignSelf: "center",
                  marginTop: 30,
                  marginBottom: 20,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                  PrivacyOption === null || ListName === "" ? "#aadecc" : "#00a46c",
                }}
              //  onPress={() => PostReview()}
                disabled={ PrivacyOption === null  || ListName === "" ? true : false}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                    fontSize: 16,
                    color: "white",
                  }}
                >
                Create List
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        
      </SafeAreaView>
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
      marginTop: 50,
      shadowColor: "#000",
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
  