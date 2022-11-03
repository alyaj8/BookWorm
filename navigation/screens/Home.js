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
import { Rating, AirbnbRating } from "react-native-ratings";
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
  let [highetRatedList, setHighetRatedListt] = useState([]);
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
  let GetBookList = async (favoriteCatList) => {
    try {
      let list = [];
      const db = getFirestore();
      const q = query(collection(db, "Book"));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          let book = doc.data();
          book.id = doc.id;
          list.push(book);
        });
      }
      list = list.filter(
        (book, index, self) =>
          index === self.findIndex((t) => t.title === book.title)
      );
      for (var i = 0; i < list.length; i++) {
        let countStar = 0;
        list[i]?.reviews?.length > 0 &&
          list[i].reviews?.map((val, ind) => {
            countStar = countStar + +val.review;
          });
        list[i].totalReview =
          countStar === 0
            ? countStar
            : (countStar / list[i]?.reviews.length).toFixed(2);
      }
      list.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      list = list.sort((a, b) => b.totalReview - a.totalReview);
      setHighetRatedListt(list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", async () => {
      await GetBookFavList();
    });
    navigation.addListener("focus", async () => {
      await GetBookList();
    });
  }, []);

  console.log(faveIds, "========>ids");
  console.log(highetRatedList);

  return (
    <View
      style={{
        backgroundColor: "#edf5f0",
        marginTop: -20,
        flex: 1,
      }}
    >

      <View
        colors={["rgba(0,164,109,0.4)"]}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -45,
        }}
      ></View>

      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "47%",
            backgroundColor: "#f6fff9",
            paddingHorizontal: 9,
            marginBottom: 10,
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
            Top 5 heightest Reviews
          </Text>
          <TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#00a46c",
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
                alignSelf: "flex-end",
                width: 89,
                height: 27,
              }}
              onPress={() =>
                navigation.navigate("RatedViewAll", highetRatedList)
              }
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
            </TouchableOpacity>
          </TouchableOpacity>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ height: 90, flex: 1 }}
          >
            <LinearGradient
              colors={["rgba(0,164,109,0.09)", "transparent"]}
              style={{
                position: "absolute",
                elevation: 2,
                left: 0,
                right: 0,
                height: "55%",
                marginTop: 170,
                top: 0,
                width: 9999,
              }}
            />
            {highetRatedList.length > 0 ? (
              highetRatedList.map(
                (val, ind) =>
                  ind < 5 && (
                    <TouchableOpacity
                      //////////////////////////////////////////////////////////////here book
                      key={ind}
                      onPress={() => navigation.navigate("BookInfo", val)}
                      style={{
                        height: 246,
                        elevation: 2,
                        marginLeft: 20,
                        marginTop: 10,
                        width: 160,
                        // backgroundColor: "#f3f6f4",
                        borderRadius: 15,
                        marginBottom: 40,
                      }}
                      disabled={val.deleted}
                    >
                      <Image
                        source={{ uri: val.poster }}
                        style={{ width: "100%", height: 160, borderRadius: 20 }}
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
                          {Datacat(val.title, 15)}
                          {"\n"}
                        </Text>
                      </View>
                      <Rating
                        startingValue={val.totalReview}
                        imageSize={20}
                        fractions={20}
                        showRating={false}
                        readonly={true}
                        tintColor="#EDF5F0"
                        style={{}}
                      />
                      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        {val.totalReview}
                      </Text>
                    </TouchableOpacity>
                  )
              )
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
                There is no review yet
              </Text>
            )}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RatedViewAll", highetRatedList)
              }
              style={{
                height: 500,
                elevation: 2,
                borderRadius: 50,
                marginLeft: 20,
                marginTop: 85,
                alignItems: "center",
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
                    textDecorationLine: "underline",
                    color: "#EFCB46",
                  }}
                >
                  View More.....
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View
          //////////////////////////////////////////////////// recommendation
          style={{
            width: "100%",
            height: "47%",
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
            style={{ color: "black", marginLeft: 245, marginBottom: -30 }}
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecViewall", {
                  RecommendationList: RecommendationList,
                  faveIds: faveIds,
                })
              }
              disabled={RecommendationList.length > 0 ? false : true}
              title="View all"
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 13 }}
              >
                View all
              </Text>
            </TouchableOpacity>
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
                  padding: 15,
                  paddingTop: 7,
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
                <Text style={{ fontWeight: "bold" }}>Based on categories that you liked:</Text>
                <Text>{categories.join("-")}</Text>
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
                        // backgroundColor: "#f3f6f4",
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
                  marginLeft: 40,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "grey",
                  alignSelf: "center",
                }}
              >
                Please add some book to your favorit list
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
