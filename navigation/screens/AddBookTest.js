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
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

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
  const [update, setupdate] = useState(true);
  const [value, setValue] = React.useState({
    title: "",
    Description: "",
    category: "",
    ISBN: "",
    author: "",
    poster: "",
    virsion: "",
    pric: "",
    pdf: "",
    error: "",
  });
  const [Error, setError] = useState({
    title: true,
    Description: true,
    category: true,
    ISBN: true,
    author: true,
    poster: true,
    virsion: true,
    pric: true,
    pdf: true,
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

  let checAuther = (text) => {
    var letters = /^[\u0600-\u06FFA-Za-z ]+$/;
    if (text.match(letters) && text.length < 30) {
      return true;
    } else {
      return false;
    }
  };
  let checISBN = (text) => {
    var letters = /^[0-9]+$/;
    if (text.match(letters) && text.length == 10) {
      return true;
    } else {
      return false;
    }
  };

  let checD = (text) => {
    var letters = /^[A-Za-z ]+$/;
    if (text.match(letters)) {
      return true;
    } else {
      return false;
    }
  };

  let checT = (text) => {
    var letters = /^[\u0600-\u06FFA-Za-z ]+$/;
    if (text.match(letters) && text.length < 25) {
      return true;
    } else {
      return false;
    }
  };
  let checC = (text) => {
    var letters = /^[\u0600-\u06FFA-Za-z ,]+$/;
    if (text.match(letters) && text.length < 30) {
      return true;
    } else {
      return false;
    }
  };

  ///////////////////////////////new code
  const [addDate, setAddData] = useState("");

  //add a new data
  async function addField() {
    if (
      image === null ||
      value.title === "" ||
      value.title === undefined ||
      value.Description === "" ||
      value.Description === undefined ||
      value.ISBN === "" ||
      value.ISBN === undefined ||
      checC(value.category) === false ||
      checISBN(value.ISBN) === false ||
      checT(value.title) === false ||
      value.author === "" ||
      value.author === undefined ||
      checAuther(value.author) === false
    ) {
      if (image !== null) {
        Error.poster = true;
        setError(Error);
        setupdate(!update);
      }
      if (value.title === "" || value.title === undefined) {
        Error.title = false;
        setError(Error);

        setupdate(!update);
      }
      if (value.title !== "" && value.title !== undefined) {
        Error.title = true;
        setError(Error);
        setupdate(!update);
        if (checT(value.title)) {
          Error.authortype3 = true;
          setError(Error);
          setupdate(!update);
        } else {
          Error.authortype3 = false;
          setError(Error);
          setupdate(!update);
        }
      }

      if (value.Description === "" || value.Description === undefined) {
        Error.Description = false;
        setError(Error);

        setupdate(!update);
      }
      if (value.Description !== "" && value.Description !== undefined) {
        Error.Description = true;
        setError(Error);
        setupdate(!update);
      }
      if (value.category === "" || value.category === undefined) {
        Error.category = false;
        setError(Error);
        setupdate(!update);
      }

      if (value.category !== "" && value.category !== undefined) {
        Error.category = true;
        setError(Error);
        setupdate(!update);
        if (checC(value.category)) {
          Error.authortype8 = true;
          setError(Error);
          setupdate(!update);
        } else {
          Error.authortype8 = false;
          setError(Error);
          setupdate(!update);
        }
      }

      if (value.ISBN === "" || value.ISBN === undefined) {
        Error.ISBN = false;
        setError(Error);
        setupdate(!update);
      }
      if (value.ISBN !== "" && value.ISBN !== undefined) {
        Error.ISBN = true;
        setError(Error);
        setupdate(!update);
        if (checISBN(value.ISBN)) {
          Error.authortype2 = true;
          setError(Error);
          setupdate(!update);
        } else {
          Error.authortype2 = false;
          setError(Error);
          setupdate(!update);
        }
      }
      if (value.author === "" || value.author === undefined) {
        Error.author = false;
        setError(Error);
        setupdate(!update);
      }
      if (value.author !== "" && value.author !== undefined) {
        Error.author = true;
        setError(Error);
        setupdate(!update);
        if (checAuther(value.author)) {
          Error.authortype = true;
          setError(Error);
          setupdate(!update);
        } else {
          Error.authortype = false;
          setError(Error);
          setupdate(!update);
        }
      }
    } else {
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
          pdf: value.pdf,
          pric: value.pric,
          poster: image,
        };
        await addDoc(collection(db, "Book"), data);

        showToast();
        setError({
          ...Error,
          pdf: true,
          author: true,
          ISBN: true,
          category: true,
          Description: true,
          title: true,
          poster: true,
          pric: true,
          authortype: true,
          authortype2: true,
          authortype3: true,
          authortype8: true,
        });
        setValue({
          title: "",
          Description: "",
          category: "",
          ISBN: "",
          author: "",
          poster: "",
          virsion: "",
          error: "",
        });
        /////////////////////////////////////////////hererererrerrere
        setImage(null);
      } catch (error) {
        setValue({
          ...value,
          error: error,
        });
        console.log(error);
      }
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

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
        }}
      />
    ),

    // Overwrite 'error' type,
    // by modifying the existing `ErrorToast` component
  };

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Book Successfully Added",
      position: "bottom",
      // And I can pass any custom props I want
      props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70" },
    });
  };

  // showToast();

  return (
    <ImageBackground source={background_image} resizeMode="cover">
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              height: 40,
              paddingHorizontal: 20,
            }}
          ></View>
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
                  {!Error.poster && (
                    <Text
                      style={{
                        color: "red",
                        marginLeft: 10,
                      }}
                    >
                      Image Field is mandatory
                    </Text>
                  )}




                  <Text style={{ alignContent: "center" }}>
                    select the book's poster
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
            <Text style={styles.textD}>Title</Text>
            {!Error.title && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            {!Error.authortype3 && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                Title only accept letters less than 20 digit
              </Text>
            )}
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.title ? "red" : "black" },
              ]}
              //placeholder="First Name"
              onChangeText={(text) => setValue({ ...value, title: text })}
              underlineColorAndroid="transparent"
              value={value.title}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.textD}>Description</Text>

            {!Error.Description && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            <TextInput
              multiline={true}
              style={[
                styles.bodyX,
                { borderColor: !Error.Description ? "red" : "black" },
              ]}
              //placeholder="Last Name"
              value={value.Description}
              onChangeText={(text) => setValue({ ...value, Description: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.textD}>Category</Text>

            {!Error.category && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            {!Error.authortype8 && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                Category only accepts letters or ,
              </Text>
            )}
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.category ? "red" : "black" },
              ]}
              value={value.category}
              // placeholder="Username"
              onChangeText={(text) => setValue({ ...value, category: text })}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.textD}>ISBN</Text>
            {!Error.ISBN && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            {!Error.authortype2 && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                ISBN should be numric and of 10 digit
              </Text>
            )}
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.ISBN ? "red" : "black" },
              ]} //placeholder="E-mail"
              value={value?.ISBN?.toString()}
              onChangeText={(text) => setValue({ ...value, ISBN: text })}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.InputContainer}>
            <Text style={styles.textD}>Author</Text>
            {!Error.author && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            {!Error.authortype && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                Auther name only accept character
              </Text>
            )}
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.author ? "red" : "black" },
              ]} //secureTextEntry={true}
              //placeholder="Password"
              value={value.author}
              onChangeText={(text) => {
                setValue({ ...value, author: text });
              }}
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.textD}>The book's electronic pdf</Text>
            {!Error.pdf && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.pdf ? "red" : "black" },
              ]} //secureTextEntry={true}
              //placeholder="Password"
              value={value.pdf}
              onChangeText={(text) => setValue({ ...value, pdf: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.textD}>The book's price</Text>
            {!Error.pric && (
              <Text
                style={{
                  color: "red",
                  marginLeft: 10,
                }}
              >
                This Field is mandatory
              </Text>
            )}
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.pric ? "red" : "black" },
              ]} //secureTextEntry={true}
              //placeholder="Password"
              value={value.pric}
              onChangeText={(text) => setValue({ ...value, pric: text })}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
            />
          </View>


          <View style={styles.buttonCont}>
            <TouchableOpacity
              style={{
                width: "100%",
                backgroundColor: "#00a46c",
                height: 40,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => addField()}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                Add Book
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </ImageBackground>
  );
  // </ImageBackground> */
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
    borderRadius: 100,
    backgroundColor: "#00a46c",
  },
  InputContainer: {
    fontSize: 50,
  },
  textD: {
    marginLeft: 40,
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyX: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    margin: 12,
    width: 350,
    height: 140,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
  },
});
/*<Text style={{ fontSize: 22 }} onPress={() => navigation.goBack()}>
    Back
  </Text> */
