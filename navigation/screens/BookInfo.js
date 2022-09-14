import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
} from "react-native";
import MapView from "react-native-maps";
//import Map from './screens/Map';
//import Fetch from './src/Fetch';
//import {userSate,userEffect} from "react";
//import{collection, query,orderBy,onSanpshot,setDoc,doc,getDoc,getDocs} from "firebase/firestore";
//import{db} from "../../config/firebase";
export default function BookInfo({ route, navigation }) {
  const book = route.params;
  console.log("book", book);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: "100%",
          height: 40,
          marginTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 22 }} onPress={() => navigation.goBack()}>
          Back
        </Text>
      </View>
      <View style={{ paddingTop: 70, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "grey",
            alignItems: "center",
            height: 212,
            width: 143,
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: book.poster }}
            resizeMode="contain"
            style={styles.imagePoster}
          />
        </View>
        <View style={{ borderRadius: 25, height: 560 }}>
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EDF5F0",
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  flew: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {book.title}
              </Text>
              <Text> by {book.author}</Text>
              <Text>
                {" "}
                _______________________________________________________
              </Text>
              <Text
                style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
              >
                Review:{" "}
              </Text>
              <Text style={{ paddingLeft: 10, paddingRight: 10 }}>
                {" "}
                _______________________________________________________
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {" "}
                Your review of the book:
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {" "}
                leave your comments and read other’s:
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                {" "}
                _______________________________________________________
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                Description:
              </Text>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
              >
                {book.description}
              </Text>
              <Text
                style={{ paddingTop: 20, paddingLeft: 10, paddingRight: 10 }}
              >
                ISBN: {book.ISBN}
              </Text>

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
      </View>
      <MapView
        style={{ width: 200, height: 300 }}
        region={{
          latitude: book.location._lat,
          longitude: book.location._long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
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
    justifyContent: "center",
    alignContent: "center",
  },
  imagePoster: {
    width: "100%",
    height: "100%",
  },
});
