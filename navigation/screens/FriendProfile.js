import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ReadBookList from "./ReadBookList";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";

export default function FriendProfile({ navigation, route }) {
  let [BookList, setBookList] = useState([]);
  let [BookFavList, setBookFavList] = useState([]);
  let [BookWishList, setBookWishList] = useState([]);
  let [numberOfBook, setNumberOfBook] = useState(0);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const item = route.params;
  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
  };
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
  let GetBookFavList = async () => {
    try {
      let list = [];
      const Auth = getAuth();
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();

        const q = query(
          collection(db, "favoriteList"),
          where("favouriteListUserId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let book = doc.data();
            book.listedInFav = true;
            list.push(book);
          });
          setBookFavList(list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  let GetBookWishList = async () => {
    try {
      let list = [];
      const Auth = getAuth();
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();

        const q = query(
          collection(db, "wishList"),
          where("wishListUserId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let book = doc.data();
            book.listedInWish = true;
            list.push(book);
          });
          setBookWishList(list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  let OpenInfo = async (val) => {
    const colRef = doc(db, "Book", val.id);
    const snapshot = await getDoc(colRef);
    let book = snapshot.data();
    book.id = val.id;
    console.log(book);
    navigation.navigate("BookInfo", book);
  };
  const fetchUserFollowing = () => {
    const dataRef = doc(db, "following", auth.currentUser.uid);
    const q = collection(dataRef, "userFollowing");
    onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      console.log("dataassasss", data);
      setFollowing(data);
    });
  };
  const getData = async () => {
    try {
      const colRef = collection(db, "users");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        let user = doc.data();
        user.id = doc.id;
        myData.push(user);
      });
      // Remove duplicate books by title
      myData = myData.filter(
        (user, index, self) =>
          index === self.findIndex((n) => n.username === user.username)
      );

      //store data in AsyncStorage
      myData.sort((a, b) => a.username.localeCompare(b.username));
      setAllUsers(myData);
      const data2 = myData
        .filter((i) => i.isAdmin == false && item.id == following.map((i) => i))
        .map((item) => item);

      setUsers(data2);

      console.log("data", users.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      GetBookList();
      GetBookFavList();
      GetBookWishList();
    });
    getData();
    fetchUserFollowing();
    console.log("Route Params", item);
  }, []);
  //console.log(BookList, "========>bookList");
  return (
    <ScrollView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <View style={{ padding: 10, width: "100%", height: 150 }}>
        <TouchableOpacity>
          <Image
            source={require("./profile2.jpg")}
            style={{ width: 400, height: 170, marginTop: -9, marginLeft: -9 }}
          ></Image>
          <View></View>
          <View></View>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("./profile1.jpg")}
          style={{
            width: 140,
            height: 140,
            borderRadius: 100,
            marginTop: -50,
          }}
        ></Image>
        <Text style={{ fontSize: 23, fontWeight: "bold", padding: 10 }}>
          {`${item.firstname + " " + item.lastname}`}
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: -15 }}>
          {`following:${users.length} followers:9`}
        </Text>
        <Text
          style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}
        ></Text>
      </View>
      <View style={{ width: "102%", alignItems: "center" }}>
        <TouchableOpacity>
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              backgroundColor: "#00a46c",
              paddingHorizontal: 70,
              paddingVertical: 15,
              borderRadius: 15,
              marginBottom: 20,
              marginTop: -10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              Follow
            </Text>
          </View>
        </TouchableOpacity>
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
        style={{ height: 320 }}
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
            width: 9999,
          }}
        />
        {BookList.length > 0 ? (
          BookList.map((val, ind) => (
            <TouchableOpacity
              key={ind}
              onPress={() => OpenInfo(val)}
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
              disabled={val.deleted}
            >
              {val.deleted && (
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    alignSelf: "center",
                    width: 160,
                    opacity: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#525454",
                    height: 250,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      // backgroundColor: "black",
                    }}
                  >
                    DELETED
                  </Text>
                </View>
              )}

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
                  {Datacat(val.title, 25)}
                  {"\n"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              //  flex: 1,
              //textAlign: "center",
              marginTop: -10, ////////////////////////////////////////
              marginLeft: 130, ////////////////////////////////////////
              fontSize: 15,
              fontWeight: "bold",
              color: "grey",
              alignSelf: "center",
            }}
          >
            Book List Is Empty
          </Text>
        )}
      </ScrollView>

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
            Favorite Books
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("FavoriteList", BookFavList)}
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
        style={{ height: 320 }}
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
            width: 9999,
          }}
        />
        {BookFavList.length > 0 ? (
          BookFavList.map((val, ind) => (
            <TouchableOpacity
              key={ind}
              onPress={() => OpenInfo(val)}
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
              disabled={val.deleted}
            >
              {val.deleted && (
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    alignSelf: "center",
                    width: 160,
                    opacity: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#525454",
                    height: 250,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      // backgroundColor: "black",
                    }}
                  >
                    DELETED
                  </Text>
                </View>
              )}

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
                  {Datacat(val.title, 25)}
                  {"\n"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              //  flex: 1,
              //textAlign: "center",
              marginTop: -10, ////////////////////////////////////////
              marginLeft: 130, ////////////////////////////////////////
              fontSize: 15,
              fontWeight: "bold",
              color: "grey",
              alignSelf: "center",
            }}
          >
            Book List Is Empty
          </Text>
        )}
      </ScrollView>
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
            Wish Books
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("WishList", BookWishList)}
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
        style={{ height: 320 }}
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
            width: 9999,
          }}
        />
        {BookWishList.length > 0 ? (
          BookWishList.map((val, ind) => (
            <TouchableOpacity
              key={ind}
              onPress={() => OpenInfo(val)}
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
              disabled={val.deleted}
            >
              {val.deleted && (
                <View
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    alignSelf: "center",
                    width: 160,
                    opacity: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#525454",
                    height: 250,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "bold",
                      // backgroundColor: "black",
                    }}
                  >
                    DELETED
                  </Text>
                </View>
              )}

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
                  {Datacat(val.title, 25)}
                  {"\n"}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              //  flex: 1,
              //textAlign: "center",
              marginTop: -10, ////////////////////////////////////////
              marginLeft: 130, ////////////////////////////////////////
              fontSize: 15,
              fontWeight: "bold",
              color: "grey",
              alignSelf: "center",
            }}
          >
            Book List Is Empty
          </Text>
        )}
      </ScrollView>
    </ScrollView> //for all the page
  );
}
