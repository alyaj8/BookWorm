import * as React from "react";
import {
  View,
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
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "#EDF5F0",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "20%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            width: "100%",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontSize: "25%",
                color: "#FFF",
                fontWeight: "bold",
                alignItems: "flex-end",
              }}
            >
              WELCOME TO{"\n"}
              <Text
                style={{
                  fontSize: "26.5%",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {"  "}BOOKWORM
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        colors={["rgba(0,164,109,0.4)"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -45,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFF",
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: "4.6%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />

          <TextInput
            placeholder="Search by title or for a user"
            placeholderTextColor="#b1e5d3"
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260,
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: 10,
          marginTop: -14,
          borderRadius: 22,
        }}
      >
        <Text
          style={{ fontSize: 24, fontWeight: "700", paddingHorizontal: 20 }}
        >
          WHO ARE WE?
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            style={{ height: "80%", width: "50%", resizeMode: "stretch" }}
            source={require("./description.jpg")}
          />
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              paddingTop: 10,
              flexDirection: "row",
              fontSize: 9,
            }}
          >
            Who hates reading! {"\n"}
            Half of this plant adores and loves reading. {"\n"}
            But what will happen to those used books that are {"\n"}no longer
            needed?
            {"\n"}
            and how to make the reading community alive {"\n"}like it used to be
            in the past?.{"\n"}
            Thats when Bookworm becomes handy.{"\n"}
            This platform helps readers by providing a space{"\n"} for sharing
            their list of favorite books to others along with the ability to
            search any book they desire and see the reviews. {"\n"}Also,
            {"\n"}they can know more about the book like who’s the author and
            where they can read/buy it.
            {"\n"}Furthermore, Bookworm allows the users to sell their used
            books.
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ marginTop: "80%" }}>{""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCont: {
    marginLeft: 220,
    width: 250,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "white",
    height: 40,
    width: 180,
  },
});
/*
   
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
  */
