import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders({ route, navigation }) {
  const book = route.params;

  let [OrderList, setOrderList] = useState([]);
  let [numberOfOrder, setNumberOfOrder] = useState(0);

  let GetOrderList = async () => {
    try {
      let list = [];
      const Auth = getAuth();
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();
        const q = query(
          collection(db, "orderBook"),
          where("orderUserId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let order = doc.data();
            list.push(order);
          });
          setNumberOfOrder(list.length);
          setOrderList(list);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      GetOrderList();
    });
  }, []);

  //console.log(OrderList);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "15%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
          marginBottom: 15,
        }}
      >
        <Icon
          name="arrow-back-outline"
          size={45}
          style={{ color: "black", marginTop: 50, marginLeft: -15 }}
          onPress={() => navigation.navigate("Home")}
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
              marginTop: -29,
              fontSize: 29,
              color: "#FFF",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            My purchases
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          width: "100%",
          alignItems: "center",
        }}
      ></View>

      <ScrollView
        // alignItems ="left"
        showsVerticalScrollIndicator={true}
        style={{ height: 400 }}
      >
        <LinearGradient
          colors={["rgba(0,164,109,0.2)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 100,
            width: "100%",
            marginTop: 220,
            top: 0,
          }}
        />
        {OrderList.length > 0 ? (
          OrderList.map((val, ind) => (
            <TouchableOpacity
              key={ind}
              onPress={() => navigation.navigate("Bookpdf", val.pdf)}
              style={{
                height: 250,
                elevation: 2,
                backgroundColor: "#edf7f1",
                marginLeft: 20,
                marginTop: 20,
                borderRadius: 15,
                marginBottom: 10,
                width: 330,
              }}
            >
              <Image
                source={{ uri: val.poster }}
                style={{ width: "100%", height: 200 }}
                s
              />
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {val.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              marginTop: 159,
              fontSize: 26,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            Purchased list is empty
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
