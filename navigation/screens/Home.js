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
import { Rating, AirbnbRating } from "react-native-ratings";

export default function Home({ navigation }) {
  let [rec, setrec] = useState([]);
  let [modalVisible, setModalVisible] = useState(false);
  let [highetRatedList, setHighetRatedListt] = useState([]);
  let [categories, setCategories] = useState([]);
  let [faveIds, setFavIds] = useState([]);

  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
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
      await GetBookList();
    });
  }, []);

  console.log(highetRatedList);
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
            
            onPress={() => navigation.navigate("RatedViewAll", highetRatedList)}
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
          style={{ height: 500, flex: 1 }}
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
            highetRatedList.map((val, ind) => (
              <TouchableOpacity
                key={ind}
                onPress={() => navigation.navigate("BookInfo", val)}
                style={{
                  height: 500,
                  elevation: 2,
                  borderRadius: 50,
                  marginLeft: 20,
                  marginTop: 20,
                  borderRadius: 15,
                  marginBottom: 10,
                  width: 160,
                }}
                disabled={val.deleted}
              >
                <Image
                  source={{ uri: val.poster }}
                  style={{ width: "100%", height: 160 , borderRadius: 20, }}
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
                      <Text style={{ textAlign: "center", fontWeight:"bold" }}>
                        {val.totalReview}
                      </Text>

                
              </TouchableOpacity>
            ))
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
            onPress={() => navigation.navigate("RecViewall")}
            title="View all"
          ></Button>
          <Text>View all</Text>
        </View>
       

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
              height: 130,
              marginTop: 170,
              top: 0,
              width: 9999,
            }}
          />
          <TouchableOpacity
            // key={ind}
            //  onPress={() => OpenInfo(val)}
            style={{
              height: 250,
              elevation: 2,
              //   backgroundColor: "#FFF",
              marginLeft: 20,
              marginTop: 20,
              borderRadius: 15,
              marginBottom: 10,
              width: 160,
            }}
            //  disabled={val.deleted}
          >
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              /*onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}*/
            >
              <View>
                <View
                  style={{
                    backgroundColor: "white",
                    margin: 50,
                    padding: 50,
                    marginTop: 400,
                  }}
                >
                  <Text> hhhhhhhereeeeeehhhhhh write category</Text>
                  <Icon
                    onPress={() => setModalVisible(false)}
                    name="close-outline"
                    size={30}
                    style={{ color: "black", marginLeft: -20, marginTop: -40 }}
                  />
                </View>
              </View>
            </Modal>
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
              //  flex: 1,
              //textAlign: "center",
              marginTop: -10, ////////////////////////////////////////
              marginLeft: 10, ////////////////////////////////////////
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
