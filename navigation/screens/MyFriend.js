import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { async } from "@firebase/util";
var tempUser = [];
const MyFriend = ({ navigation }) => {
  const width1 = Dimensions.get("screen").width / 2 - 35;
  const hight1 = Dimensions.get("screen").height / 3 - 70;
  const [followingData, setFollowingData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    getData();
    fetchUserFollowing();
    console.log("heoooo", tempUser);
  }, [following.length]);
  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
  };

  const fetchUserData = (uid, getState) => {
    getDoc(doc(db, "users", uid))
      .then((snapshot) => {
        let user = snapshot.data();
        setFollowingData([...followingData, user]);
        tempUser.push(user);
      })
      .catch((er) => {
        console.log("-er", er);
      });
  };
  // const fetchUserFollowing = () => {
  //   const dataRef = doc(db, "following", auth.currentUser.uid);
  //   const q = collection(dataRef, "userFollowing");

  //   onSnapshot(q, (snapshot) => {
  //     // const tempData = [];
  //     snapshot.docs.map((doc) => {
  //       fetchUserData(doc.id);
  //       console.log("docsssssss", doc);
  //       // const id = doc.id;
  //       // return id;
  //     });
  //   });
  // };
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
        .filter((i) => i.isAdmin == false && i.uid == following.map((i) => i))
        .map((item) => item);

      setUsers(data2);
    } catch (error) {
      console.log(error);
    }
  };
  const onUnfollow = (userId) => {
    console.log("user ID", userId);
    const dataRef = collection(
      db,
      "following",
      auth.currentUser.uid,
      "userFollowing"
    );
    deleteDoc(doc(dataRef, userId));
  };
  const fetchUserFollowing = () => {
    const dataRef = doc(db, "following", auth.currentUser.uid);
    const q = collection(dataRef, "userFollowing");
    onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      setFollowing(data);
    });
  };
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      {following.length === 0 ? (
        <>
          <View
            style={{
              backgroundColor: "#00a46c",
              height: "10%",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingHorizontal: 20,
              marginBottom: 15,
              justifyContent: "center",
            }}
          >
            <Icon
              name="arrow-back-outline"
              size={45}
              style={{ color: "black", marginLeft: -10 }}
              onPress={() => navigation.goBack()}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -10,
                width: "100%",
              }}
            >
              <Text
                style={{
                  marginLeft: 79,
                  marginTop: -35,
                  fontSize: 29,
                  color: "#FFF",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                My Followings
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "90%",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No User Found</Text>
          </View>
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: "#00a46c",
              height: "10%",
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingHorizontal: 20,
              marginBottom: 15,
              justifyContent: "center",
            }}
          >
            <Icon
              name="arrow-back-outline"
              size={45}
              style={{ color: "black", marginLeft: -10 }}
              onPress={() => navigation.goBack()}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -10,
                width: "100%",
              }}
            >
              <Text
                style={{
                  marginLeft: 79,
                  marginTop: -35,
                  fontSize: 29,
                  color: "#FFF",
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                My Followings
              </Text>
            </View>
          </View>
          <FlatList
            data={following}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            numColumns={2}
            style={{ width: "100%" }}
            contentContainerStyle={{
              alignSelf: "center",
              justifyContent: "space-between",
            }}
            keyExtractor={(item, index) => item.id + index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  width: width1,
                  height: hight1,
                  borderWidth: 1,
                  borderRadius: 5,
                  marginBottom: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
              >
                <View
                  style={{
                    height: 70,
                    width: 70,
                    // borderWidth: 1,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("./profile1.jpg")}
                    style={{
                      height: 70,
                      width: 70,
                      marginTop: -9,
                      marginLeft: -9,
                    }}
                  ></Image>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                  }}
                >
                  <Text>
                    <Text
                      style={{
                        textAlign: "center",
                        textAlignVertical: "center",
                        fontWeight: "bold",
                        fontSize: 12,
                        //margin: 10,
                      }}
                    >
                      {Datacat(item.username, 11)}
                      {"\n"}
                      {console.log("itmesss", item.uid)}
                    </Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    height: 30,
                    width: 80,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    onUnfollow(item.uid);
                    fetchUserFollowing();
                    getData();
                  }}
                >
                  <Text style={{ color: "#fff" }}>unfollow</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={{ height: 100 }} />
        </>
      )}
    </SafeAreaView>
  );
};

export default MyFriend;
