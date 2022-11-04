import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export default function FriendProfile({ navigation, route }) {
  let [BookList, setBookList] = useState([]);
  let [BookFavList, setBookFavList] = useState([]);
  let [BookWishList, setBookWishList] = useState([]);
  let [numberOfBook, setNumberOfBook] = useState(0);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  let [CustomeList, setCustomeLists] = useState([]);

  // console.log("🚀 ~ currentActiveUser", currentActiveUser);

  const item = route.params;

  const Auth = getAuth();
  const currentUser = auth?.currentUser;

  // const Datacat = (str, num) => {
  //   if (str.len gth > num) {
  //     return str.substring(0, num) + "...";
  //   }
  //   return str;
  // };

  let GetBookList = async () => {
    // console.log("Gte Book List");
    try {
      let list = [];

      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();

        const q = query(
          collection(db, "readBookList"),
          where("favouriteUserId", "==", item.uid)
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
    // console.log("GetBooKFavList");
    try {
      let list = [];

      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();

        const q = query(
          collection(db, "favoriteList"),
          where("favouriteListUserId", "==", item.uid)
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
    // console.log("getBookWishList");
    try {
      let list = [];

      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();

        const q = query(
          collection(db, "wishList"),
          where("wishListUserId", "==", item.uid)
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

  let GetAddList = async () => {
    setCustomeLists([]);
    // console.log(item, "=========>");
    try {
      let lists = [];

      const db = getFirestore();
      const q = query(
        collection(db, "CustomLists"),
        where("List_user_id", "==", item.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        lists = [];
        querySnapshot.forEach((doc) => {
          let list = doc.data();
          if (!list.privacy) {
            console.log(list);
            lists.push(list);
          }
        });
        setCustomeLists(lists);
      } else {
        setCustomeLists([]);
      }
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
    const dataRef = doc(db, "following", item.id);
    const q = collection(dataRef, "userFollowing");
    onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      setFollowing(data);
    });
  };

  const fetchUserFollower = () => {
    const dataRef = doc(db, "following", item.id);
    const q = collection(dataRef, "userFollower");
    onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      setFollower(data);
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
        // user.uid === currentUser.uid && setCurrentActiveUser(user);
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

  const getBookList = async (user) => {
    console.log("first");
    // const q = query(
    //   collection(db, "wishList"),
    //   where("wishListUserId", "==", user.uid)
    // );
    try {
      let privacy = [];

      console.log("second");
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();
        const q = query(
          collection(db, "CustomLists"),
          where("List_user_id", "==", item.uid)
        );
        console.log("Qsssssssssss", q);
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let privacy = doc.data();
            // privacy.privacy = false;
            if (privacy.privacy) {
              return null;
            } else {
              GetBookList();
              GetBookFavList();
              GetBookWishList();
              GetAddList();
            }
          });
        }
      });
    } catch (error) {
      console.log("errorrrr", error);
    }
  };

  const onFollow = async () => {
    // console.log("item", item);

    const dataRef = collection(
      db,
      "following",
      auth.currentUser.uid,
      "userFollowing"
    );
    setDoc(doc(dataRef, item.id), {})
      .then((res) => { })
      .finally(() => {
        fetchUserFollowing();
      });

    const dataRef1 = collection(db, "following", item.id, "userFollower");
    setDoc(doc(dataRef1, currentUser.uid), {})
      .then((res) => { })
      .finally(() => {
        getData();
        fetchUserFollowing();
      });

    // const docRef = doc(db, "following", currentUser.uid,);
    // const docSnap = await getDocs(collection(docRef, "userFollowing", userId));
    // console.log()
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      GetBookList();
      GetBookFavList();
      GetBookWishList();
      GetAddList();
    });
    // getBookList();

    getData();
    fetchUserFollowing();
    fetchUserFollower();

    console.log("Route Params", item);
  }, [navigation]);

  // console.log(
  //   follower,
  //   follower.join("").includes(currentUser.uid),
  //   // "nkgnkkkkkkkkk"
  // );

  const EmptyListComponent = ({ isPrivate }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 100,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "grey",
          }}
        >
          {/* List */}
          Book List Is {isPrivate ? "Private" : "Empty"}
        </Text>
      </View>
    );
  };

  const renderBookList = (booksList, type) => {
    const isListPrivate = item.lists && item.lists[type].isPrivate;
    const isListEmpty = booksList.length === 0;

    let listNav;
    let listTitle;

    switch (type) {
      case "read":
        listNav = "ReadBookList";
        listTitle = "Read Books";
        break;
      case "wish":
        listNav = "WishList";
        listTitle = "Wish Books";
        break;
      case "fav":
        listNav = "FavoriteList";
        listTitle = "Favorite Books";
        break;
      default:
        break;
    }

    return (
      <>
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
              {listTitle}
            </Text>
          </View>

        </View>
        {booksList?.length > 0 && !isListPrivate ? (
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
            {booksList.map((val, ind) => (
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
                    {val.title}
                    {"\n"}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <EmptyListComponent isPrivate={isListPrivate} />
        )}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#e0e0e0",
            marginBottom: 10,
          }}
        />
      </>
    );
  };

  const renderCustomList = (booksList) => {
    return CustomeList.length > 0 ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={{
          height: 320,
        }}
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
        {CustomeList.map((val, ind) => (
          <View key={ind}>
            {/* <MaterialIcons
                name="delete"
                size={30}
                style={{
                  color: "red",
                  marginTop: 30,
                  marginLeft: 10,
                  position: "absolute",
                  left: 10,
                  zIndex: 1,
                }}
                onPress={() =>
                  DeleteFunc(
                    "Deleting From Read List ",
                    DeleteReadBookList,
                    val
                  )
                }
              /> */}
            <TouchableOpacity
              key={ind}
              onPress={() => navigation.navigate("ViewCustomeLists", val)}
              style={{
                height: 100,
                elevation: 2,
                backgroundColor: "rgba(0,164,109,0.09)",
                marginLeft: 20,
                marginTop: 50,
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

              {/* <Image
                  source={{ uri: "" }}
                  style={{ width: "100%", height: 100 }}
                /> */}
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
                    fontSize: 22,
                    textAlign: "center",
                    color: "#585a61"
                  }}
                >
                  {val.ListName}
                  {"\n"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    ) : (
      <EmptyListComponent />
    );
  };

  //console.log(BookList, "========>bookList");
  return (
    <ScrollView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Icon
          name="arrow-back-outline"
          justifyContent="space-between"
          size={45}
          style={{ color: "black", marginTop: 50, marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
      </View>
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
          {`following:${following.length} followers:${follower.length}`}
        </Text>
        <Text
          style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}
        ></Text>
      </View>
      <View style={{ width: "102%", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => onFollow()}
          disabled={follower.join("").includes(currentUser.uid) ? true : false}
        >
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              backgroundColor: follower.join("").includes(currentUser.uid)
                ? "gray"
                : "#00a46c",
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
              {follower.join("").includes(currentUser.uid)
                ? "Followed"
                : "Follow"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Read Books */}
      {renderBookList(BookList, "read")}

      {/* Favorite Books */}
      {renderBookList(BookFavList, "fav")}

      {/* Wish Books */}
      {renderBookList(BookWishList, "wish")}

      {/* My Custom Lists */}
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
            Custom Lists
          </Text>
        </View>
        <View style={{ width: "50%", alignItems: "flex-end" }}>

        </View>
      </View>
      {renderCustomList(CustomeList)}
    </ScrollView> //for all the page
  );
}
