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
import Icon from "react-native-vector-icons/Ionicons";
import {sendPushNotification} from '../../util/Notifications'
import * as ImagePicker from "expo-image-picker";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  where,
  getDocs,
  documentId,
  query
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

import { AntDesign } from "@expo/vector-icons";

import background_image from "./222.jpg";

export default function AddBookTest({ navigation, route }) {
  const book = route.params;

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

  const onClickSendNotification = async ()=>{
    let notifications = [];

    const db = getFirestore();
    const q = query(
      collection(db, "users"),
      where(documentId(), "in", book.notifiedUser),
    );
    
    const usersDocsSnap = await getDocs(q);
    
    usersDocsSnap.forEach((doc) => {
      const user = doc.data();
      if(doc.exists){

        notifications.push({
          to: user.push_token,
          sound: "default",
          title: book.title,
          body: 'The pdf verion is available now!',
        })
      }
    });

    sendPushNotification(notifications)
    
  }
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
    console.log(value);
    if (
      image === null ||
      value.title === "" ||
      value.title === undefined ||
      value.Description === "" ||
      value.Description === undefined ||
      value.ISBN === "" ||
      value.ISBN === undefined ||
      value.author === "" ||
      value.author === undefined ||
      value.virsion === "" ||
      value.virsion === undefined ||
      value.pric === "" ||
      value.pric === undefined
    ) {
      console.log(value.title);

      /*  if (image === null) {
        Error.poster = false;
        setError(Error);
        setupdate(!update);
      }*/
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
      }

      if (value.virsion === "" || value.virsion === undefined) {
        Error.virsion = false;
        setError(Error);
        setupdate(!update);
      }
      if (value.virsion !== "" && value.virsion !== undefined) {
        Error.virsion = true;
        setError(Error);
        setupdate(!update);
      }

      if (value.pric === "" || value.pric === undefined) {
        Error.pric = false;
        setError(Error);
        setupdate(!update);
      }
      if (value.pric !== "" && value.pric !== undefined) {
        Error.pric = true;
        setError(Error);
        setupdate(!update);
      }
      console.log(Error);
    } else {
      try {
        const db = getFirestore();
        // check if we have new feilds data
        //get the timestamp
        console.log(data, "========>data");
        const data = {
          title: value.title,
          Description: value.Description,
          category: value.category,
          ISBN: value.ISBN,
          author: value.author,
          pdf: value.virsion,
          pric: value.pric,
          poster: image,
        };
        console.log(book.id);
        await setDoc(doc(db, "Book", book.id), data);
        if(book?.notifiedUser && book?.notifiedUser.length > 0 && value.virsion){ 
          onClickSendNotification()
        }
        await showToast();
        setError({
          ...Error,
          virsion: true,
          author: true,
          ISBN: true,
          category: true,
          Description: true,
          title: true,
          poster: true,
          pric: true,
        });
        await navigation.navigate("BookInfoApi", {
          title: value.title,
          Description: value.Description,
          category: value.category,
          ISBN: value.ISBN,
          author: value.author,
          virsion: value.virsion,
          pric: value.pric,
          poster: image,
          id: book.id,
        });
      } catch (error) {
        setValue({
          ...value,
          error: error,
        });
        console.log(error);
      }
    }
  }
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
      text2: "Book Successfully Updated",
      position: "bottom",
      // And I can pass any custom props I want
      props: { uuid: "bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70" },
    });
  };

  useEffect(() => {
    console.log(book, "=======>");
    setValue({
      title: book.title,
      Description: book.Description,
      category: book.category,
      ISBN: book.ISBN,
      author: book.author,
      poster: book.poster,
      virsion: book.virsion,
      pric: book.pric,
      error: "",
    });
    setImage(book.poster);
    setupdate(!update);
  }, []);

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
          <Icon
            name="arrow-back-outline"
            size={45}
            style={{ color: "black", marginTop: 40, marginLeft: 15 }}
            onPress={() => navigation.goBack()}
          />
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

          <View></View>

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
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.ISBN ? "red" : "black" },
              ]} //placeholder="E-mail"
              value={value?.ISBN?.toString()}
              onChangeText={(text) => setValue({ ...value, ISBN: text })}
              underlineColorAndroid="transparent"
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
            <TextInput
              style={[
                styles.body,
                { borderColor: !Error.author ? "red" : "black" },
              ]} //secureTextEntry={true}
              //placeholder="Password"
              value={value.author}
              onChangeText={(text) => setValue({ ...value, author: text })}
              underlineColorAndroid="transparent"
            />
          </View>
          <View>
            <Text style={styles.textD}>The book's electronic virsion</Text>
            {!Error.virsion && (
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
                { borderColor: !Error.virsion ? "red" : "black" },
              ]} //secureTextEntry={true}
              //placeholder="Password"
              value={value.virsion}
              onChangeText={(text) => setValue({ ...value, virsion: text })}
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
              <Text style={{ color: "white", fontWeight: "bold" }}>
                ADD BUTTON
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
