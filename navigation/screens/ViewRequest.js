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
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import BookInfo from "./BookInfo";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useDebounce } from "use-debounce";
import { db } from "../../config/firebase";
// import db from ".";
export default function ViewRequest({ navigation }) {
  const [catergoryIndex, setCategoryIndex] = useState(0);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [url, setUrl] = useState("");
  const [value] = useDebounce(searchText, 1000);
  const booksRef = collection(db, "Book");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    searchBooks(value);
    setRefreshing(false);
  };

  useEffect(() => {
    searchBooks(searchText);
  }, [searchText]);

  const searchBooks = async (bookName) => {
    console.log(bookName);
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
    );
    const data = await response.json();

    const books = data.items.map((book) => {
      return {
        title: book.volumeInfo.title || "No title",
        author: book.volumeInfo.authors[0] || "No Author",
        Description: book.volumeInfo.description || "No description",
        poster: book.volumeInfo.imageLinks.thumbnail || "",
        category: book.volumeInfo.categories[0] || "No category",

        previewLink: book.volumeInfo.previewLink || "",
      };
    });

    if (bookName === "") {
      setBooks([]);
      setAllBooks([]);
    } else {
      setAllBooks(books);
      setBooks(books);
    }

    // console.log("🚀 ~ data", books);
  };

  const getBook = async (bookId) => {
    const docRef = doc(booksRef, bookId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Book data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such Book!");
    }
  };

  const addBook = async (book) => {
    console.log("🚀 ~ book", book);
    addDoc(booksRef, book)
      .then((docRef) => {
        console.log("Document has been added successfully");
        getBook(docRef.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const categories = ["ALL", "ADULT", "ROMANCE"];
  const width1 = Dimensions.get("screen").width / 2 - 30;
  const hight1 = Dimensions.get("screen").height / 3 - 40;
  const hight2 = Dimensions.get("screen").height / 3 - 20;
  const width2 = Dimensions.get("screen").width / 2.5 - 20;
  const Datacat = (str, num) => {
    if (str?.length > num) {
      return str?.substring(0, num) + "...";
    }
    return str;
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./222.jpg")}
        resizeMode="cover"
      >
        <View style={styles.searchContainer}>
          <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Search book by title"
            placeholderTextColor="#b1e5d3"
            onChangeText={(text) => setSearchText(text)}
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260,
            }}
          />
        </View>

        <View style={styles.booksContainer}>
          {books.length < 1 ? (
            <Text>
              {value.length > 0
                ? "No books found"
                : "Find books from google books API"}
            </Text>
          ) : (
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={books}
              refreshing={refreshing}
              onRefresh={onRefresh}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => {
                // console.log("🚀 ~ item", item);
                return (
                  //  restUrl(item.data.poster)
                  <View
                    style={{
                      width: width1,
                      height: hight1,
                      margin: 1,
                      marginBottom: 10,
                    }}
                  >
                    <View style={styles.card}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("BookInfo", item)}
                      >
                        <Image
                          style={styles.container}
                          source={
                            item.poster
                              ? { uri: item.poster }
                              : require("./222.jpg")
                          }
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
                            {Datacat(item?.title, 17)}
                            {"\n"}
                          </Text>
                          <Text
                            style={{
                              textAlign: "left",
                              color: "grey",
                              fontSize: 9,
                            }}
                          >
                            By:
                            {Datacat(item?.author, 19)} {"\n"}{" "}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                      <TouchableWithoutFeedback onPress={() => addBook(item)}>
                        <View style={styles.addButton}>
                          <Icon
                            name="add"
                            size={20}
                            style={{
                              color: "#fff",
                            }}
                          />
                          <Text style={styles.addText}>Add</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                );
              }} //here i want my data
            />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "68%",
    width: "95%",
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
  },
  oneBook: {
    height: 140,
    justifyContent: "center",
    width: 350,
    backgroundColor: "lightgrey",
    borderRadius: 25,
    margin: 50,
    alignItems: "center",
  },
  card: {
    height: "100%",
    width: "90%",
    backgroundColor: "#EDF5F0",
    borderRadius: 10,
    borderColor: "#00a46c",
    borderWidth: 0.2,
    padding: 10,
    margin: 5,
    marginBottom: 10,
    marginHorizontal: 5,
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
  booksContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#00a46c",
    borderWidth: 0.6,
    marginBottom: 75,
  },
  searchContainer: {
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
  },
  addButton: {
    flex: 1,
    width: 100,
    height: 10,
    flexDirection: "row",
    backgroundColor: "#00a46c",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    marginTop: -15,
  },
  addText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
