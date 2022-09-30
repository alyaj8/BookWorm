
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import StripeApp from "./StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
import react, { useEffect, useState } from "react";

//import Map from './screens/Map';
//import Fetch from './src/Fetch';
//import {userSate,userEffect} from "react";
//import{collection, query,orderBy,onSanpshot,setDoc,doc,getDoc,getDocs} from "firebase/firestore";
//import{db} from "../../config/firebase";

import {
  collection,
  doc,
  getFirestore,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function BookInfo({ route, navigation }) {
  const book = route.params;

  let [update, setUpdate] = useState(false);

  let AddInfo = async () => {
    try {
      const Auth = getAuth();
      const uid = Auth?.currentUser?.uid;
      const db = getFirestore();
      const data = book;
      data.favouriteUserId = uid;
      await addDoc(collection(db, "readBookList"), data);
      book.listed = true;
      setUpdate(true);
      alert("This Book Is Added to Your Favourite Book List");
    } catch (error) {
      alert(error);
    }
  };

  let CheckListed = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      const db = getFirestore();
      const q = query(
        collection(db, "readBookList"),
        where("favouriteUserId", "==", user.uid),
        where("id", "==", book.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        book.listed = true;
        setUpdate(true);
      }
    });
  };
  useEffect(() => CheckListed(), []);

  let CheckOrder = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {

      try {
        const db = getFirestore();
        const q = query(
          collection(db, "orderBook"),
          where("orderUserId", "==", user.uid),
          where("id", "==", book.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          book.order = true;
          setUpdate(true);
        }
      } catch (error) {
        console.log(error);

      }
    });
  };

  useEffect(() => {
    CheckListed();
    CheckOrder();
  }, []);

  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <ImageBackground source={require("./222.jpg")} resizeMode="cover">
            <Icon
              name="arrow-back-outline"
              size={40}
              style={{ color: "black", marginTop: 30, marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
            <View
              style={{
                //poster area
                // backgroundColor: "grey",
                alignItems: "center",
                alignSelf: "center",
                height: 360,
                width: 200,
                justifyContent: "center",
                margin: "5%",
                shadowColor: "black",
                shadowOpacity: 0.6,
                shadowOffset: {
                  width: 2,
                  height: 8,
                },
              }}
            >
              <Image
                source={book.poster?{ uri: book.poster }: require("./222.jpg")}
                resizeMode="stretch"
                style={styles.imagePoster}
              />
            </View>

            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EDF5F0",

                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
                borderColor: "#00a46c",
                borderWidth: 0.7,
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
                  // fontSize: "25%",
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                {book.title}
              </Text>
              <Text
                style={{
                  flew: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 9,
                  paddingLeft: 10,
                  paddingRight: 10,
                  // fontSize: "15%",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                by {book.author}
              </Text>

              <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
                <Icon name="star" size={30} style={{ color: "gold" }} />
                <Icon name="star" size={30} style={{ color: "gold" }} />
                <Icon name="star" size={30} style={{ color: "gold" }} />
                <Icon name="star" size={30} style={{ color: "gold" }} />
                <Icon name="star-half" size={30} style={{ color: "gold" }} />
              </View>
              <Text style={{ fontWeight: "bold", alignSelf: "flex-start", marginBottom: 15, }}>
                {"\n"}
                {"Book description: "}
              </Text>
              
              <Text style= {{textAlign:"justify",}}>{book.Description}</Text>
              <Text style={{ fontWeight: "bold", alignSelf: "flex-start",marginBottom: 15,  }}>
                {"\n"}
                {"Book Details: "}
              </Text>
              <Text style={{ alignSelf: "flex-start", fontWeight:"bold", }}>
                {"ISBN:"}
                {"    "}
                {book.ISBN}
                {"\n\n"}
                {"CATEGORY:"}
                {"    "}
                {book.category}
                {"\n "}
              </Text>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRadius: 25,
                  backgroundColor: book.listed ? "#aadecc" : "#00a46c",
                  paddingHorizontal: 20,
                }}
                onPress={() => AddInfo()}
                disabled={book.listed}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingBottom: 10,
                    fontSize: 18,
                  }}
                >
                  {book.listed ? "AlREADY ADDED TO LIST" : "ADD TO LIST"}
                  <Icon name="add" size={36} style={{ color: "white" }} />
                </Text>
              </TouchableOpacity>

              <Text>
                {"\n"}
                Review it
              </Text>
              <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
                <Icon name="star-outline" size={36} style={{ color: "gold" }} />
                <Icon name="star-outline" size={36} style={{ color: "gold" }} />
                <Icon name="star-outline" size={36} style={{ color: "gold" }} />
                <Icon name="star-outline" size={36} style={{ color: "gold" }} />
                <Icon name="star-outline" size={36} style={{ color: "gold" }} />
              </View>

              <Text style={{ fontWeight: "bold", alignSelf: "flex-start" }}>
                {"\n"}
                Leave your comments and read other’s: {"\n"}
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  alignSelf: "center",
                  height: 100,
                  width: 340,
                }}
              >
                <TextInput
                  placeholder="comment"
                  underlineColorAndroid="transparent"
                  scrollEnabled
                />
              </View>
              <View>
                <TouchableOpacity
                  style={[
                    styles.fixToText,
                    {
                      backgroundColor: book.order ? "#aadecc" : "#00a46c",
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate("StripeApp", book);
                  }}
                  disabled={book.order}
                >
                  <Text style={styles.buyit}>
                    {book.order ? "Bought already" : "Buy it here"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixToText: {

    width: 155,

    height: 50,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 40,
    paddingLeft: 10,
  },
  imagePoster: {
    width: "100%",
    height: "100%",
    marginTop: "40%",
    marginBottom: "67%",
  },
  buyit: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
/*<TouchableOpacity
onPress={() => navigation.navigate("StripeApp")}
>
<Text>buy Here</Text>
</TouchableOpacity>*/
