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
    ImageBackground,
    Alert,
  } from "react-native";
  import { useState, useEffect } from "react";
  
  import Icon from "react-native-vector-icons/Ionicons";
  import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "../../config/firebase";
  import { getAuth } from "firebase/auth";
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  
  export default function ViewCustomeLists({ navigation, route }) {
    let [listbook, setListbooks] = useState([]);
    let [update, setUpdate] = useState(true);
    let data = route.params;
    const Datacat = (str, num) => {
      if (str.length > num) {
        return str.substring(0, num) + "...";
      }
      return str;
    };
    let OpenInfo = async (val) => {
      const colRef = doc(db, "Book", val.id);
      const snapshot = await getDoc(colRef);
      let book = snapshot.data();
      book.id = val.id;
      navigation.navigate("BookInfo", book);
    };
  
    let getCurrentCustomeList = async () => {
      try {
        let books = [];
        const Auth = getAuth();
        Auth.onAuthStateChanged(async (user) => {
          const db = getFirestore();
  
          const q = query(
            collection(db, "BookCustomeLists"),
            where("user_uid", "==", user.uid),
            where("listName", "==", data.ListName)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              let book = doc.data();
              book.customId = doc.id;
              books.push(book);
            });
            setListbooks(books);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    let DeleteCustomeBookList = async (val, ind) => {
      await deleteDoc(doc(db, "BookCustomeLists", val.customId));
      listbook.splice(ind, 1);
      console.log(listbook);
      setListbooks(listbook);
      setUpdate(!update);
      Alert.alert("the book got deleted");
    };
    const DeleteFunc = (message, func, val, ind) =>
      Alert.alert(
        message,
        "Are sure you want to delete",
        [
          {
            text: "Cancel",
            //  onPress: () => Alert.alert("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: () => func(val, ind),
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
    useEffect(() => {
      // navigation.addListener("focus", () => {});
      getCurrentCustomeList();
    }, []);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("./222.jpg")}
          resizeMode="cover"
        >
          <Icon
            name="arrow-back-outline"
            size={40}
            style={{ color: "black", marginTop: 30, marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          />
          <ScrollView showsVerticalScrollIndicator={true}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {listbook.length > 0 ? (
                listbook.map((val, ind) => (
                  <View>
                    <MaterialIcons
                      name="close"
                      size={30}
                      style={{
                        color: "black",
                        marginTop: 30,
                        marginLeft: 10,
                        position: "absolute",
                        left: 10,
                        zIndex: 1,
                      }}
                      onPress={() =>
                        DeleteFunc(
                          "Deleting From Custome List ",
                          DeleteCustomeBookList,
                          val,
                          ind
                        )
                      }
                    />
                    <TouchableOpacity
                      key={ind}
                      onPress={() => OpenInfo(val)}
                      style={{
                        height: 250,
                        elevation: 2,
                        backgroundColor: "#EFF3EF",
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
                          {"\n"}{" "}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text
                  style={{
                    flex: 1,
                    textAlign: "center",
                    marginTop: 50,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  {data.ListName} List Is Empty
                </Text>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
  
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
      margin: 10,
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
  