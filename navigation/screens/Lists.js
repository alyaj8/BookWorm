import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ReadBookList from "./ReadBookList";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Lists({ navigation }) {
  let [BookList, setBookList] = useState([]);
  let [numberOfBook, setNumberOfBook] = useState(0);
  let GetBookList = async () => {
    try {
      let list = [];
      const Auth = getAuth();
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();

        const q = query(
          collection(db, "readBookList"),
          where("favouriteUserId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let book = doc.data();
            book.listed = true;
            list.push(book);
          });
          setNumberOfBook(list.length);
          setBookList(list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      GetBookList();
    });
  }, []);
  console.log(BookList, "========>bookList");
  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "13%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
          marginBottom: 15,
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
                fontSize: 21,
                color: "#FFF",
                fontWeight: "bold",
              }}
            >
              You read {numberOfBook} books
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
            }}
          >
            Read Books
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReadBookList", BookList)}
          >
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#FFF",
                }}
              >
                View all
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={{ height: 400 }}
      >
        <LinearGradient
          colors={["rgba(0,164,109,0.09)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 100,
            marginTop: 220,
            top: 0,
          }}
        />
        {BookList.length > 0 ? (
          BookList.map((val, ind) => (
            <TouchableOpacity
              key={ind}
              onPress={() => navigation.navigate("BookInfo", val)}
              style={{
                height: 250,
                elevation: 2,
                backgroundColor: "#FFF",
                marginLeft: 20,
                marginTop: 20,
                borderRadius: 15,
                marginBottom: 10,
                width: 160,
              }}
            >
              <Image
                source={{ uri: val.poster }}
                style={{ width: "100%", height: 200 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {val.title}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              marginTop: 50,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Book List Is Empty
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
