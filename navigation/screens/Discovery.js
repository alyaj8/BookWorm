import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Icon from "react-native-vector-icons/Ionicons";

//import { FlatList } from "react-native-gesture-handler";

export default function Discovry({ navigation }) {
  const [books, setBooks] = useState([]);
  const [url, setUrl] = useState("");
  const width1 = Dimensions.get("screen").width / 2 - 30;
  const hight1 = Dimensions.get("screen").height / 3 - 40;

  const width2 = Dimensions.get("screen").width / 2.5 - 20;

  const booksCol = collection(db, "Book");

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

  /* const restUrl = (link1) => {
    setUrl(link1)  }*/

  return (
    <SafeAreaView>
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
      <View
        style={{
          backgroundColor: "#FFF",
          paddingVertical: 6,
          paddingHorizontal: 10,
          margin: 20,
          borderRadius: 10,
          marginTop: 25,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={books}
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
                      backgroundColor: "white",
                      borderRadius: 10,
                      marginBottom: -2,
                      marginTop: -12,
                      marginRight: -12,
                    }}
                  >
                    <Icon name="add" size={18} style={{ color: "green" }} />
                  </View>
                </View>
                <TouchableOpacity>
                  <Image
                    style={styles.container}
                    source={{
                      uri: item.data.poster,
                    }}
                  />
                  <Text>
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "16",
                      }}
                    >
                      {item.data.title} {"\n"}
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",
                        color: "grey",
                        fontSize: "10",
                      }}
                    >
                      By:
                      {item.data.author} {"\n"}
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                      <Icon
                        name="star-half"
                        size={16}
                        style={{ color: "#ECEF50" }}
                      />
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )} //here i want my data
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 168,
    width: 138,
    borderRadius: 10,

    // alignItems: "stretch",
    // margin: 15,
  },
  oneBook: {
    //padding: 1,
    height: 128,
    justifyContent: "center",
    width: 350,
    backgroundColor: "lightgrey",
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
  },
  card: {
    height: 250,
    backgroundColor: "#EEF7F3",
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
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
