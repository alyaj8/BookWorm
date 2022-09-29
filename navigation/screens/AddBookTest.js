import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  View,
  ImageBackground,
  Alert,
  TextTrack,
  ActivityIndicator,
  date,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  firestore,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { AntDesign } from "@expo/vector-icons";

import background_image from "./222.jpg";

/*function msg (error){
  switch (error.code){
         case "auth/invalid-email":
          error.code = "Wrong email address";
          break;

          case "auth/email-already-in-use":
            error.code= "The email is already registered try to login or use forgot password";
            break;

            case "auth/weak-password":
              error.code= "week password";
              break;
  

          default:
          return error.code;
        }
        return error.code;
}*/

export default function AddBookTest({ navigation }) {
  const [image, setImage] = useState(null);
  const [value, setValue] = React.useState({
    title: "",
    Description: "",
    category: "",
    ISBN: "",
    author: "",
    poster: "",
    error: "",
  });

  /// AddImage
  const options = {
    title: "select image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: "photo",
      includeBase64: false,
    },
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      // firebase;
      var name = Math.random();
      const storage = getStorage();
      const storageRef = ref(storage, `posters${name}`);
      const response = await fetch(result.uri);
      const file = await response.blob();
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot);
        getDownloadURL(snapshot.ref).then((url) => {
          setImage(url);
        });
        console.log("Uploaded a blob or file!");
      });
    }
  };
  //remove image
  const removeImage = () => setImage(null);

  // const auth = getAuth();

  ///////////////////////////////new code
  const [addDate, setAddData] = useState("");

  //add a new data
  async function addField() {
    console.log(value.poster, "=======>");
    if (
      value.title === "" ||
      value.Description === "" ||
      value.category === "" ||
      value.author === "" ||
      value.ISBN === "" ||
      image === null
    ) {
      setValue({
        ...value,
        error: "all feilds are mandatory.",
      });
      return;
    }

    try {
      const db = getFirestore();
      // check if we have new feilds data
      //get the timestamp
      const data = {
        title: value.title,
        Description: value.Description,
        category: value.category,
        ISBN: value.ISBN,
        author: value.author,
        poster: image,
      };
      await addDoc(collection(db, "Book"), data);
      alert("Book Successfully Added");
    } catch (error) {
      setValue({
        ...value,
        error: error,
      });
      console.log(error);
    }
  }
  ////////////////////////////////////end new code
  /*async function addBook() {

    if ( value.title ==="" || value.Description === "" || value.category === ""||value.author === ""||value.ISBN === "" ){
      setValue({
        ...value,
        error: "all feilds are mandatory.",
      });
      return;
    }
    try {
      //const {user} = await createUserWithEmailAndPassword(auth, value.email, value.password,value.email, value.password);
      console.log('user',user.uid)
      const db = getFirestore();
      const data = {
        title:value.title,
        Description:value.Description,
        category:value.category,
        ISBN:value.ISBN,
        author:value.author,
        poster:value.poster,
        
      };
      await setDoc(doc(db,"Book", user.uid), data);
      alert("Book is added");
      navigation.navigate("AdminPage");
    } catch (er) {
      er = msg(er)
      setValue({
        ...value,
        error: er,
      });
      console.log(er);
    }
  }*/

  return (
    <ImageBackground source={background_image} resizeMode="cover">
      <ScrollView>
        <Image
          style={{ height: "100%", width: "100%", position: "absolute" }}
          source={require("../screens/222.jpg")}
        />
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              height: 40,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 22 }} onPress={() => navigation.goBack()}>
              Back
            </Text>
          </View>
          <Text style={[styles.title, styles.leftTitle]}>Add new Book</Text>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {value?.error}
          </Text>

          <View style={styles.InputContainer}>
            <View style={{ alignItems: "center" }}>
              <TouchableHighlight onPress={() => pickImage()}>
                <View
                  style={{ alignItems: "center" }}
                  onChangeText={(text) => setValue({ ...value, poster: URL })}
                >
                  <Entypo name="images" size={24} color="#576F72" />

                  <Text style={{ alignContent: "center" }}>
                    the book's poster
                  </Text>
                </View>
              </TouchableHighlight>

              {image && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: 5,
                    alignContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: image }}
                    style={{ width: 250, height: 200, marginTop: 12 }}
                  />
                  <AntDesign
                    onPress={() => removeImage()}
                    name="close"
                    size={24}
                    color="black"
                  />
                </View>
              )}
            </View>

            <Text style={styles.textD} s>
              Title
            </Text>
            <TextInput
              style={styles.body}
              //placeholder="First Name"
              onChangeText={(text) => setValue({ ...value, title: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.textD}>Description</Text>
            <TextInput
              multiline={true}
              style={styles.body}
              //placeholder="Last Name"
              onChangeText={(text) => setValue({ ...value, Description: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.textD}>Category</Text>
            <TextInput
              style={styles.body}
              // placeholder="Username"
              onChangeText={(text) => setValue({ ...value, category: text })}
              underlineColorAndroid="transparent"
            />
          </View>

          <View></View>

          <View style={styles.InputContainer}>
            <Text style={styles.textD}>ISBN</Text>
            <TextInput
              style={styles.body}
              //placeholder="E-mail"
              onChangeText={(text) => setValue({ ...value, ISBN: text })}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.textD}>Author</Text>
            <TextInput
              style={styles.body}
              //secureTextEntry={true}
              //placeholder="Password"
              onChangeText={(text) => setValue({ ...value, author: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.textD}>the book's electronic virsion</Text>
            <TextInput
              style={styles.body}
              //secureTextEntry={true}
              //placeholder="Password"
              onChangeText={(text) => setValue({ ...value, poster: text })}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.buttonCont}>
            <Button
              title="Add Book"
              color="#B1D8B7"
              onPress={() => addField()} //
            ></Button>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    margin: 12,
    width: 350,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
  },
  buttonCont: {
    margin: 20,
    padding: 5,
    width: 250,
    alignSelf: "center",
    borderRadius: 50,
    //backgroundColor: "#B1D8B7",
  },
  InputContainer: {
    fontSize: 50,
  },
  textD: {
    marginLeft: 40,
  },
});
