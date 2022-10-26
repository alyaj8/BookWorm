import { collection, getDocs } from "firebase/firestore";
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
import * as Notifications from 'expo-notifications';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';
//import * as Notifications from 'expo-notifications';
import Icon from "react-native-vector-icons/Ionicons";
import { db } from "../../config/firebase";
import { withUser } from "../../config/UserContext";

function Discovry({ navigation, isAdmin }) {
  const [catergoryIndex, setCategoryIndex] = useState(0);
  //const categories = ["ALL", "ADULT", "ROMANCE"]; in order for search by category to work this must be disabled
  const [refreshing, setRefreshing] = useState(false);

  console.log("isAdmin", isAdmin);

  const onRefresh = () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };
  const CategoryList = () => {
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
  };
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getData();
  }, []);

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
      const colRef = collection(db, "Book");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        let book = doc.data();
        book.id = doc.id;
        myData.push(book);
      });
      // Remove duplicate books by title
      myData = myData.filter(
        (book, index, self) =>
          index === self.findIndex((t) => t.title === book.title)
      );

      //store data in AsyncStorage
      myData.sort((a, b) => a.title.localeCompare(b.title));
      setAllBooks(myData);
      setBooks(myData);
    } catch (error) {
      console.log(error);
    }
  };

  const searchBooks = (text) => {
    console.log(text);
    const filter = [];
    allBooks.forEach((e) => {
      if (
        e.title.toLowerCase().includes(text.toLowerCase()) ||
        e.author.toLowerCase().includes(text.toLowerCase()) ||
        e.category.toLowerCase().includes(text.toLowerCase())
      ) {
        filter.push(e);
      }
    });
    setBooks(filter);
    console.log(books);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./222.jpg")}
        resizeMode="cover"
      >
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
            placeholder="Search by title /author /category"
            placeholderTextColor="#b1e5d3"
            onChangeText={(text) => searchBooks(text)}
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
          {books.length < 1 ? (
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
              Book not found!
            </Text>
          ) : (
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={books}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                //  restUrl(item.data.poster)
                <View style={{ width: width1, height: hight1 }}>
                  <View style={styles.card}>
                    <View style={{ alignItems: "flex-end" }}>
                      <View
                        style={{
                          width: 19,
                          height: 19,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                          marginTop: -12,
                          marginRight: -12,
                        }}
                      ></View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(
                          isAdmin ? "BookInfoApi" : "BookInfo",
                          item
                        )
                      }
                    >
                      <Image
                        style={styles.container}
                        source={{
                          uri: item.poster,
                        }}
                      />
                      <Text>
                        <Text
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 12,
                            //margin: 10,
                          }}
                        >
                          {Datacat(item.title, 11)}
                          {"\n"}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: "grey",
                            fontSize: 10,
                          }}
                        >
                          By:
                          {Datacat(item.author, 19)} {"\n"}{" "}
                        </Text>

                        <Text
                          style={{
                            textAlign: "left",
                            color: "grey",
                            fontSize: 10,
                          }}
                        >
                          category:
                          {Datacat(item.category, 10)} {"\n"}{" "}
                        </Text>
                        
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
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
    height: "90%",
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
