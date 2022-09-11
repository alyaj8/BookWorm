import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";

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

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  //grab location

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    if (errorMsg) {
      setErrorMsg(errorMsg);
    }
  };

  //pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  //remove image
  const removeImage = () => setImage(null);

  //save book to th server

  const saveBook = async (values) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const settings = {
        method: "POST",
        headers: headers,
        mode: "no-cors",
        body: JSON.stringify(values),
      };
      const url = "http://bookworm.a2hosted.com/general/books";
      const fetchResponse = await fetch(url, settings);
      const data = await fetchResponse.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <Formik
      initialValues={{
        ISBN: Date.now(),
        title: "",
        catrgory: "",
        Description: "",
        author: "",
        poster: "",
        longitude: "",
        latitude: "",
      }}
      onSubmit={(values) => {
        values.latitude = location?.latitude + "";
        values.longitude = location?.longitude + "";
        values.poster = image;
        saveBook(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View>
              <Text style={styles.title}>Add your Book</Text>
            </View>
            <View>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("title")}
                value={values.title}
              />
            </View>
            <View>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("catrgory")}
                value={values.catrgory}
              />
            </View>
            <View>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("Description")}
                value={values.Description}
              />
            </View>
            <View>
              <TouchableHighlight onPress={() => pickImage()}>
                <View style={styles.viewIconButton}>
                  <Entypo name="images" size={24} color="#576F72" />
                  <Text style={styles.iconButton}>viewIconButton</Text>
                </View>
              </TouchableHighlight>

              {image && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: 5,
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

            <View>
              <Text style={styles.label}>Author</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("author")}
              />
            </View>

            <TouchableHighlight onPress={() => getLocation()}>
              <View style={styles.viewIconButton}>
                <Text>Location</Text>
                <Entypo name="location-pin" size={24} color="#576F72" />
              </View>
            </TouchableHighlight>

            <View style={styles.submitView}>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.addButton}
              >
                <Text style={styles.addButton} c>
                  Add
                </Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 40,
    color: "#C6E7DD",
  },
  input: {
    backgroundColor: "#E9F7EF",
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    paddingLeft: 6,
    borderColor: "#576F72",
  },
  label: {
    marginBottom: 6,
    color: "#576F72",
  },
  viewIconButton: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "gray",
    padding: 10,
    backgroundColor: "#E9F7EF",
    borderRadius: 12,
  },
  iconButton: {
    marginHorizontal: 20,
    color: "#576F72",
  },
  submitView: {
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#1EB15A",
    color: "#fff",
    textAlign: "center",
    borderRadius: 12,
    paddingVertical: 4,
    fontSize: 20,
  },
});
