import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import * as Notifications from 'expo-notifications';
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../config/firebase";
import { withUser } from "../../config/UserContext";

function Discovry({ navigation, isAdmin }) {
  const [catergoryIndex, setCategoryIndex] = useState(0);
  //const categories = ["ALL", "ADULT", "ROMANCE"];
  const [refreshing, setRefreshing] = useState(false);

  // console.log("isAdmin", isAdmin);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };
  /*const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}
          >
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };*/
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("");
  const [follow, setFollow] = useState(false);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    getData();
    fetchUserFollowing();
    // console.log("folowwwwwwwwwwwwwww", following);
    // console.log(
    //   "folwwwoswsss",
    //   users.filter((item) => item.uid != following.map((i) => i))
    // );
    if (following.indexOf(auth.currentUser.uid) > -1) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [following.length]);

  const width1 = Dimensions.get("screen").width / 2 - 35;
  const hight1 = Dimensions.get("screen").height / 3 - 70;

  const width2 = Dimensions.get("screen").width / 2.5 - 20;

  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
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
        .filter((i) => i.isAdmin == false && i.uid != following.map((i) => i))
        .map((item) => item);

      setUsers(data2);
    } catch (error) {
      console.log(error);
    }
  };

  const searchUsers = (text) => {
    console.log(text);
    const filter = [];
    allUsers.forEach((e) => {
      console.log("🚀 ~ e", e);
      if (e.username.toLowerCase().includes(text.toLowerCase())) {
        e.isAdmin == false ? filter.push(e) : null;
      }
    });
    setUsers(filter);
    // console.log(users);
  };

  /* const restUrl = (link1) => {
    setUrl(link1)  }*/
  /////////////////////// notification
  /*  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
}*/
  const onFollow = async (userId, item) => {
    // console.log("item", item);

    const dataRef = collection(
      db,
      "following",
      auth.currentUser.uid,
      "userFollowing"
    );
    setDoc(doc(dataRef, userId), {})
      .then((res) => { })
      .finally(() => {
        getData();
        fetchUserFollowing();
      });

    const dataRef1 = collection(db, "following", userId, "userFollower");
    setDoc(doc(dataRef1, auth.currentUser.uid), {})
      .then((res) => { })
      .finally(() => {
        getData();
        fetchUserFollowing();
      });

    // const docRef = doc(db, "following", currentUser.uid,);
    // const docSnap = await getDocs(collection(docRef, "userFollowing", userId));
    // console.log()
  };
  const onUnfollow = (userId) => {
    const dataRef = collection(
      db,
      "following",
      auth.currentUser.uid,
      "userFollowing"
    );
    deleteDoc(doc(dataRef, userId));

    const dataRef1 = collection(db, "following", userId, "userFollower");
    deleteDoc(doc(dataRef1, auth.currentUser.uid));
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
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./222.jpg")}
        resizeMode="cover"
      >
        {/* Search */}
        <View
          style={{
            backgroundColor: "#FFF",
            // D0ECDF
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 25,
            marginBottom: -10,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderWidth: 0.2,
          }}
        >
          <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search for a User"
            placeholderTextColor="#b1e5d3"
            onChangeText={(text) => searchUsers(text)}
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260,
            }}
          />
        </View>

        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 10,
            marginTop: 25,
            flexDirection: "row",
            alignItems: "center",
            borderColor: "#00a46c",
            marginBottom: 40,
          }}
        >
          {users.length < 1 ? (
            <Text
              style={{
                marginTop: 200,
                fontSize: 30,
                marginLeft: 57,
                color: "grey",
                fontWeight: "bold",
                //alignItems: "center",
                alignSelf: "center",
              }}
            >
              User not found!
            </Text>
          ) : (
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={users}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                //  restUrl(item.data.poster)
                <TouchableOpacity
                  style={{
                    width: width1,
                    height: hight1,
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate("friendProfile", item)}
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
                      </Text>
                    </Text>
                  </TouchableOpacity>
                  {item?.id !== auth.currentUser.uid ? (
                    following.join("").includes(item.id) ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "gray",
                          height: 30,
                          width: 80,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                        }}
                        onPress={() => onUnfollow(item.id)}
                      >
                        <Text style={{ color: "#fff" }}>Followed</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "green",
                          height: 30,
                          width: 80,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                        }}
                        onPress={() => onFollow(item.id, item)}
                      >
                        <Text style={{ color: "#fff" }}>Follow</Text>
                      </TouchableOpacity>
                    )
                  ) : null}
                </TouchableOpacity>
              )} //here i want my data
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default withUser(Discovry);

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "90%",
    borderRadius: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 2,
      height: 8,
    },
    alignSelf: "center",

    //alignItems: "center",
    // margin: 15,
  },
  oneBook: {
    //padding: 1,
    height: 130,
    justifyContent: "center",
    width: 350,
    backgroundColor: "lightgrey",
    borderRadius: 25,
    margin: 50,
    alignItems: "center",
  },
  card: {
    height: "80%",
    backgroundColor: "#EDF5F0",
    marginHorizontal: 10,
    borderRadius: 10,
    margin: 5,
    marginBottom: 30,
    padding: 10,
    borderColor: "#00a46c",
    borderWidth: 0.2,
  },
  categoryContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  categoryText: { fontSize: 15, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: "green",
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
});

/*const booksCol = collection(db, "Book");
  useEffect(() => {
    const q = query(booksCol); //which tabel
    onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);


  const Create = () => {
    const myDoc = doc(db, "as", "ss");

    const docData = {
      name: "ali",
      username: "alii",
    };
    setDoc(myDoc, docData).then(() => {
      alert("donnne");
    });
  };*/

/*
    <Button title="click" onPress={Read}></Button>
      {books != null && <Text>{books.name}</Text>}
  



  const Read = () => {
    const myDoc = doc(db, "as", "ss");

    getDoc(myDoc).then((snapshot) => {
      //if (snapshot.exists)
      setBooks(snapshot.data());
    });
  };*/

/*
const [books1, setBooks1] = useState([]);

  const Doc = query(collection(db, "as"));

  getDocs(Doc).then((querySnapshot) => {
    let values = null;
    querySnapshot.forEach((doc) => {
      //  console.log(doc.data());
      setBooks1(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  });*/