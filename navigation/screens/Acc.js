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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { withUser } from "../../config/UserContext";


export default function Acc({ navigation }) {
  const [infoList, setinfoList] = useState([]);
  const [update, setupdate] = useState(true);
  const [oldName, setOldName] = useState("");
  const [value, setValue] = React.useState({
    email: "",
    firstname: "",
    isAdmin: "",
    lastname: "",
    password: "",
    username: "",
  });
  const [Error, setError] = useState({
    firstname: true,
    lastname: true,
    usernametype: true,
    usernameunique: true,
  });

  // const [userDoc, setUserDoc] = useState([]);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const colRef = doc(db, "users", user.uid);
      const snapshot = await getDoc(colRef);
      //  console.log(snapshot.id, "========>");
      let userdata = snapshot.data();
      setValue(userdata);
      setOldName(userdata.username);
      //const q = query(collection(db, "users"), where("uid", "==", user.uid));
      //  const snapshot = await getDocs(q);

      // var myData = [];
      //store the data in an array myData
      // snapshot.forEach((doc) => {
      //   let userinfo2 = doc.data();
      //   userinfo2.id = doc.id;
      //   console.log(userinfo2);
      //   myData.push(userinfo2);
      // });
      // setinfoList(myData);
      // console.log(infoList);
    } catch (error) {
      // console.log(infoList);
    }
  };

  let saveChanges = async () => {
    if (
      value.firstname === "" ||
      value.lastname === "" ||
      value.username === "" ||
      checkFirstName(value.firstname) === false ||
      checklastName(value.lastname) === false ||
      checkUserName(value.username) === false ||
      (await CheckUnique(value.username)) === false
    ) {
      if (checkFirstName(value.firstname) && value.firstname !== "") {
        Error.firstname = true;
        setError(Error);
        setupdate(!update);
      }
      if (!checkFirstName(value.firstname) || value.firstname === "") {
        Error.firstname = false;
        setError(Error);
        setupdate(!update);
      }

      if (checklastName(value.lastname) && value.lastname !== "") {
        Error.lastname = true;
        setError(Error);
        setupdate(!update);
      }
      if (!checklastName(value.lastname) || value.lastname === "") {
        Error.lastname = false;
        setError(Error);
        setupdate(!update);
      }

      if (checkUserName(value.username) && value.username !== "") {
        Error.usernametype = true;
        setError(Error);
        setupdate(!update);
      }
      if (!checkUserName(value.username) || value.username === "") {
        Error.usernametype = false;
        setError(Error);
        setupdate(!update);
      }

      if (await CheckUnique()) {
        Error.usernameunique = true;
        setError(Error);
        setupdate(!update);
      }
      if (!(await CheckUnique())) {
        Error.usernameunique = false;
        setError(Error);
        setupdate(!update);
      }
    } else {
      // await setDoc(doc(db, "users", user.uid), value);
      alert("Profile Updated Successfully");
      setError({
        firstname: true,
        lastname: true,
        usernametype: true,
        usernameunique: true,
      });
      setOldName(value.username);
    }
  };

  let checkFirstName = (value) => {
    var letters = /^[A-Za-z]+$/;
    if (value.match(letters) && value.length < 15) {
      return true;
    } else {
      return false;
    }
  };

  let checklastName = (value) => {
    var letters = /^[A-Za-z]+$/;
    if (value.match(letters) && value.length < 26) {
      return true;
    } else {
      return false;
    }
  };

  let checkUserName = (value) => {
    var letters = /^[0-9a-zA-Z-_]+$/;
    if (value.match(letters) && value.length < 26) {
      return true;
    } else {
      return false;
    }
  };

  let CheckUnique = async () => {
    if (oldName === value.username) {
      return true;
    } else {
      const q = query(
        collection(db, "users"),
        where("username", "==", value.username)
      );
      const snapshot = await getDocs(q);
      console.log(snapshot.empty, "========>empty");
      return snapshot.empty;
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
          height: "13%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
          marginBottom: 15,
          marginTop: -80,
        }}
      >
        <Icon
          name="arrow-back-outline"
          size={45}
          style={{ color: "black", marginTop: 30, marginLeft: -15 }}
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
              marginLeft: 79,
              marginTop: -35,
              fontSize: 29,
              color: "#FFF",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            My detailes
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: "#FFF",
            // height: "80%",
            borderRadius: 50,
            paddingHorizontal: 20,
            marginBottom: 15,
            paddingBottom: 10,
            marginTop: 15,
          }}
        >
          <View style={{ marginTop: 40, marginLeft: -10 }}>
            <View style={styles.InputContainer}>
              <Text style={{ fontWeight: "bold" }}>First Name</Text>
              {!Error.firstname && (
                <Text
                  style={{
                    color: "red",
                    marginLeft: 10,
                  }}
                >
                  Please enter a firstname of only characters and dosnt exceed
                  15 digit
                </Text>
              )}
              <TextInput
                style={[
                  styles.body,
                  { borderColor: !Error.firstname ? "red" : "green" },
                ]}
                placeholder={value.firstname}
                placeholderTextColor="black"
                value={value.firstname}
                onChangeText={(text) => setValue({ ...value, firstname: text })}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <Text style={{ fontWeight: "bold" }}>{"\n"}Last Name</Text>
              {!Error.lastname && (
                <Text
                  style={{
                    color: "red",
                    // marginLeft: 10,
                  }}
                >
                  Please enter a lasttname of only characters and dosnt exceed
                  25 digit
                </Text>
              )}
              <TextInput
                style={[
                  styles.body,
                  { borderColor: !Error.lastname ? "red" : "green" },
                ]}
                placeholder={value.lastname}
                value={value.lastname}
                placeholderTextColor="black"
                onChangeText={(text) => setValue({ ...value, lastname: text })}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <Text style={{ fontWeight: "bold" }}>{"\n"}User Name</Text>
              {!Error.usernametype && (
                <Text
                  style={{
                    color: "red",
                    // marginLeft: 10,
                  }}
                >
                  Please enter a username that has character or _ or- and dosnt
                  exceed 25 digit
                </Text>
              )}
              {!Error.usernameunique && (
                <Text
                  style={{
                    color: "red",
                    // marginLeft: 10,
                  }}
                >
                  This User Name is already Used please enter other
                </Text>
              )}
              <TextInput
                style={styles.body}
                placeholder={value.username}
                value={value.username}
                placeholderTextColor="black"
                onChangeText={(text) => setValue({ ...value, username: text })}
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.InputContainer}>
              <Text style={{ fontWeight: "bold" }}>{"\n"}Email</Text>

              <TextInput
                style={styles.body}
                placeholder={value.email}
                value={value.email}
                placeholderTextColor="black"
                editable={false}
                //   onChangeText={(text) => setValue({ ...value, email: text })}
                underlineColorAndroid="transparent"
                //  titl
                e="nnn"
                // value={user.email}
              />
            </View>

            <View style={styles.buttonCont}>
              <TouchableOpacity onPress={() => saveChanges()}>
                <Text style={styles.savechanges}>Save changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
    marginVertical: 12,
    width: "95%",
    height: 42,
    alignSelf: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "green",
  },
  buttonCont: {
    width: 180,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 20,
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
