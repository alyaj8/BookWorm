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
  updatePassword,
} from "firebase/auth";
import {
  collection,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { withUser } from "../../config/UserContext";

export default function Changepass({ navigation }) {
  const [current, setCurrentPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [infoList, setinfoList] = useState([]);
  const [error, setError] = useState("");

  // const [userDoc, setUserDoc] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const colRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(colRef);
    let userdata = snapshot.data();
    setCurrentPass(userdata.password);
  };

  let savePass = async () => {
    // console.log(user.uid, current);

    console.log(newPass.length);

    if (newPass.length > 7) {
      if (oldPass === current) {
        updatePassword(user, newPass)
          .then(async () => {
            await updateDoc(doc(db, "users", user.uid), { password: newPass });
            setError("");
            navigation.goBack();
          })
          .catch((error) => {
            setError(error.message);
          });
      } else {
        setError("Current Password is not Matched");
      }
    } else {
      setError("Password will be more then 7 character");
    }
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#EDF5F0",
        flex: 1,
      }}
    >
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={2}
        data={infoList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {setFname(item.firstname)} {setemail(item.email)}
              {setLname(item.lastname)}
              {setUsername(item.username)}
              {setPassword(item.password)}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          backgroundColor: "#00a46c",
          height: "12%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
          marginBottom: 15,
        }}
      >
        <Icon
          name="arrow-back-outline"
          size={45}
          style={{ color: "black", marginTop: 35, marginLeft: -15 }}
          onPress={() => navigation.goBack()}
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
              marginLeft: 60,
              marginTop: -35,
              fontSize: 29,
              color: "#FFF",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Change password
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFF",
          height: "80%",
          borderRadius: 50,
          paddingHorizontal: 20,
          marginBottom: 15,
          marginTop: 15,
          paddingTop: 50,
        }}
      >
        <Text
          style={{
            color: "red",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {error}
        </Text>
        <View style={{ marginTop: 40, marginLeft: -10 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Current password
            </Text>
            <TextInput
              style={styles.body}
              //  placeholder={"*****"}
              //  placeholderTextColor="black"
              // onChangeText={(text) => setValue({ ...value, firstname: text })}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setOldPass(text)}
            />
          </View>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {"\n"}New password
            </Text>
            <TextInput
              style={styles.body}
              //   placeholder={lastname}
              //   placeholderTextColor="black" //     onChangeText={(text) => setValue({ ...value, lastname: text })}
              underlineColorAndroid="transparent"
              onChangeText={(text) => setNewPass(text)}
            />
          </View>

          <View style={styles.buttonCont}>
            <TouchableOpacity onPress={() => savePass()}>
              <Text style={styles.savechanges}>Save password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  title: {
    alignItems: "left",
    justifyContent: "left",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 12,
    width: 350,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "green",
  },
  buttonCont: {
    width: 180,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 30,
    paddingLeft: 10,
    alignSelf: "center",
  },
  savechanges: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 18,
  },
});
