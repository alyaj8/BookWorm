import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { withUser } from "../../config/UserContext";

export default function Account({ navigation }) {
  const [infoList, setinfoList] = useState([]);
  const [fname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const colRef = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        let userinfo2 = doc.data();
        userinfo2.id = doc.id;
        myData.push(userinfo2);
      });
      setinfoList(myData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ backgroundColor: "#EDF5F0" }}>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        data={infoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {setFname(item.firstname)}
              {setLname(item.lastname)}
            </Text>
          </View>
        )}
      />
      <ScrollView>
        <View style={{ padding: 10, width: "100%", height: 150 }}>
          <TouchableOpacity>
            <Image
              source={require("./profile2.jpg")}
              style={{ width: 400, height: 170, marginTop: -9, marginLeft: -9 }}
            ></Image>
            <View></View>
            <View></View>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("./profile1.jpg")}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: -50,
            }}
          ></Image>
          <Text style={{ fontSize: 23, fontWeight: "bold", padding: 10 }}>
            HELLO WELCOME,
          </Text>
          <Text style={{ fontSize: 29, fontWeight: "bold" }}>{fname}</Text>
          <Text
            style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}
          ></Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Acc")}>
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "#fff",
              width: "90%",
              padding: 20,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 0.3,
              elevation: 15,
              marginTop: 1,
            }}
          >
            <Icon name="person-outline" size={30} style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, marginTop: 7 }}>Edit my details</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Changepass")}>
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "#fff",
              width: "90%",
              padding: 20,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 0.3,
              elevation: 15,
              marginTop: 17,
            }}
          >
            <Icon
              name="lock-closed-outline"
              size={30}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontSize: 16, marginTop: 7 }}>Change password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Orders")}
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowOpacity: 0.3,
            elevation: 15,
            marginTop: 20,
          }}
        >
          <Icon
            name="briefcase-outline"
            size={30}
            style={{ marginRight: 10 }}
          />
          <Text style={{ fontSize: 16, marginTop: 7 }}>My purchases </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowOpacity: 0.3,
            elevation: 15,
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("myfriend")}
        >
          <Icon name="people-outline" size={30} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, marginTop: 7 }}>My friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const auth = getAuth();
            await signOut(auth);
            navigation.navigate("WelcomePage");
          }}
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            backgroundColor: "#fff",
            width: "90%",
            padding: 20,
            paddingBottom: 22,
            borderRadius: 10,
            shadowOpacity: 0.3,
            elevation: 15,
            marginTop: 20,
            marginBottom: 19,
          }}
        >
          <Icon name="log-out-outline" size={30} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, marginTop: 7 }}>Log-out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
