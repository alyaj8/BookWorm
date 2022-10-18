import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { useEffect, useState } from "react";

//import Map from './screens/Map';
//import Fetch from './src/Fetch';
//import {userSate,userEffect} from "react";
//import{collection, query,orderBy,onSanpshot,setDoc,doc,getDoc,getDocs} from "firebase/firestore";
//import{db} from "../../config/firebase";

import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Discovery from "./Discovery";
export default function BookInfoApi({ route, navigation }) {
  const book = route.params;

  let [update, setUpdate] = useState(false);
  let DeleteBook = async () => {
    await deleteDoc(doc(db, "Book", book.id));
    DeleteBookRead();
    DeleteBookFav();
    DeleteBookWish();
    Alert.alert("the book got deleted");
    navigation.goBack();
  };
  let DeleteBookRead = async () => {
    const q = query(collection(db, "readBookList"), where("id", "==", book.id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        let data = book;
        data.deleted = true;
        await updateDoc(doc(db, "readBookList", document.id), data);
      });
    }
  };
  let DeleteBookFav = async () => {
    const q = query(collection(db, "favoriteList"), where("id", "==", book.id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        let data = book;
        data.deleted = true;
        await updateDoc(doc(db, "favoriteList", document.id), data);
      });
    }
  };
  let DeleteBookWish = async () => {
    const q = query(collection(db, "wishList"), where("id", "==", book.id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach(async (document) => {
        let data = book;
        data.deleted = true;
        await updateDoc(doc(db, "wishList", document.id), data);
      });
    }
  };

  const showAlert = () =>
    Alert.alert(
      "Deleting a book ",
      "Are sure you want to delete",
      [
        {
          text: "Cancel",
          //  onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => DeleteBook(),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  let AddInfo = async () => {
    book.listed = true;
    setUpdate(true);

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
      book.listed = false;
      setUpdate(true);
      alert(error);
    }
  };

  let CheckListed = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    });
  };

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
        <ImageBackground source={require("./222.jpg")} resizeMode="cover">
          <ScrollView>
            <Icon
              name="arrow-back-outline"
              size={40}
              style={{ color: "black", marginTop: 30, marginLeft: 10 }}
              onPress={() => navigation.pop(2)}
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
                source={{ uri: book.poster }}
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
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginBottom: 15,
                }}
              >
                {"\n"}
                {"Book description: "}
              </Text>

              <Text style={{ textAlign: "justify" }}>{book.Description}</Text>
              <Text
                style={{
                  fontWeight: "bold",
                  alignSelf: "flex-start",
                  marginBottom: 15,
                }}
              >
                {"\n"}
                {"Book Details: "}
              </Text>
              <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
                {"ISBN:"}
                {"    "}
                {book.ISBN}
                {"\n\n"}
                {"CATEGORY:"}
                {"    "}
                {book.category}
                {"\n \n"}
                {"price:"}
                {"    "}
                {book.pric}
                {"$"}
                {"\n "}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.buttonCont}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Editbook", book)}
                  >
                    <Text style={styles.bouttontitle}>Edit book </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonCont2}>
                  <TouchableOpacity onPress={showAlert}>
                    <Text style={styles.bouttontitle}>Delete book </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
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
  buttonCont: {
    width: 150,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 20,
    alignSelf: "center",
  },
  buttonCont2: {
    width: 150,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 20,
    alignSelf: "center",
    marginLeft: 10,
  },
  bouttontitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    // marginRight: 18,
  },
});
/*<TouchableOpacity
  onPress={() => navigation.navigate("StripeApp")}
  >
  <Text>buy Here</Text>
  </TouchableOpacity>*/
