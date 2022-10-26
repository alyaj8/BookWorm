import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Button,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function Home({ navigation }) {
  let [rec, setrec] = useState([]);
  let [modalVisible, setModalVisible] = useState(false);
  let [RecommendationList, setRecommendationList] = useState([]);
  let [categories, setCategories] = useState([]);
  let [faveIds, setFavIds] = useState([]);

  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
  };

  let GetBookFavList = async () => {
    try {
      let list = [];
      let ids = [];
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

            let check = book.category.includes(",");
            if (check) {
              list.push(book.category);

              let splitRarray = book.category.split(",");
              splitRarray.map((v) => {
                list.push(v);
              });
            } else {
              list.push(book.category);
            }
            ids.push(book.id);
          });
        }
        let uniqueChat = [...new Set(list)];
        setFavIds(ids);
        setCategories(uniqueChat);
        Recommendation(uniqueChat);
      });
    } catch (error) {
      console.log(error);
    }
  };

  let Recommendation = async (favoriteCatList) => {
    try {
      let list = [];
      const db = getFirestore();
      if (favoriteCatList.length > 0) {
        for (var i = 0; i < favoriteCatList.length; i++) {
          const q = query(
            collection(db, "Book"),
            where("category", "==", favoriteCatList[i])
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              let book = doc.data();
              book.id = doc.id;
              console.log(doc.id, "iddid");
              list.push(book);
            });
          }
        }
        list = list.filter(
          (book, index, self) =>
            index === self.findIndex((t) => t.title === book.title)
        );
        setRecommendationList(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await GetBookFavList();
    });
  }, []);

  console.log(faveIds, "========>ids");

  return (
    <View
      style={{
        backgroundColor: "#edf5f0",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "14%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}
      ></View>
      <View
        colors={["rgba(0,164,109,0.4)"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -45,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFF",
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 20,
            marginTop: "3.5%",
            flexDirection: "row",
            alignItems: "center",
            borderColor: "black",
            borderWidth: 0.2,
            height: 46,
          }}
        >
          <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />

          <TextInput
            placeholder="Search by title"
            placeholderTextColor="#b1e5d3"
            style={{
              fontWeight: "bold",
              fontSize: 18,
              width: 260,
            }}
          />
        </View>
      </View>

      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "35%",
            backgroundColor: "#f6fff9",
            paddingHorizontal: 9,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
              marginBottom: -18,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Highest Rated Books
          </Text>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
                alignSelf: "flex-end",
                width: 89,
                height: 27,
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ height: 300 }}
          >
            <LinearGradient
              colors={["rgba(0,164,109,0.09)", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 150,
                marginTop: 170,
                top: 0,
                width: 9999,
              }}
            />
            <TouchableOpacity
              style={{
                height: 250,
                elevation: 2,
                marginLeft: 20,
                marginTop: 20,
                borderRadius: 15,
                marginBottom: 10,
                width: 160,
              }}
            >
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
                ></Text>
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginTop: -10,
                marginLeft: 10,
                fontSize: 15,
                fontWeight: "bold",
                color: "grey",
                alignSelf: "center",
              }}
            >
              Empty
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            height: "35%",
            backgroundColor: "#f6fff9",
            paddingHorizontal: 9,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 17,
              color: "#585a61",
              marginBottom: -18,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Recommendation
          </Text>
          <Icon
            onPress={() => setModalVisible(true)}
            name="information-circle-outline"
            size={30}
            style={{ color: "black", marginLeft: 230, marginBottom: -30 }}
          />

          <View
            style={{
              backgroundColor: "#00a46c",
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 15,
              alignSelf: "flex-end",
              width: 89,
              height: 27,
            }}
          >
            <Button
              onPress={() =>
                navigation.navigate("RecViewall", RecommendationList)
              }
              title="View all"
            ></Button>
            <Text>View all</Text>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View>
              <View
                style={{
                  backgroundColor: "white",
                  margin: 50,
                  padding: 50,
                  marginTop: 400,
                  borderRadius: 5,
                  elevation: 5,
                }}
              >
                <Icon
                  onPress={() => setModalVisible(false)}
                  name="close-outline"
                  size={30}
                  style={{ color: "red", textAlign: "right" }}
                />
                <Text>Categories Are {categories.join("_-")}</Text>
              </View>
            </View>
          </Modal>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ height: 500 }}
          >
            <LinearGradient
              colors={["rgba(0,164,109,0.09)", "transparent"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "55%",
                marginTop: 170,
                top: 0,
                width: 9999,
              }}
            />
            {RecommendationList.length > 0 ? (
              RecommendationList.map((val, ind) => {
                return (
                  faveIds.length > 0 &&
                  !faveIds.join("").includes(val.id) && (
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
                  )
                );
              })
            ) : (
              <Text
                style={{
                  marginTop: -10,
                  marginLeft: 130,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "grey",
                  alignSelf: "center",
                }}
              >
                Empty
              </Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCont: {
    marginLeft: 220,
    width: 250,
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "white",
    height: 40,
    width: 180,
  },
});
