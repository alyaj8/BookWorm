import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";

import Icon from "react-native-vector-icons/Ionicons";

export default function ReadBookList({ navigation, route }) {
  let books = route.params;
  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("./222.jpg")}
        resizeMode="cover"
      >
        <Icon
          name="arrow-back-outline"
          size={40}
          style={{ color: "black", marginTop: 30, marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
        <ScrollView
        showsVerticalScrollIndicator={true}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {books.length > 0 ? (
              books.map((val, ind) => (
                <TouchableOpacity
                  key={ind}
                  onPress={() => navigation.navigate("BookInfo", val)}
                  style={{
                    height: 250,
                    elevation: 2,
                    backgroundColor: "#EFF3EF",
                    marginLeft: "2%",
                    marginRight: "2%",
                    marginTop: 20,
                    borderRadius: 15,
                    marginBottom: 10,
                    width: "42%",
                  }}
                >
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
                     {Datacat(val.title, 39)}
                          {"\n"}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  marginTop: 50,
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "grey",
                }}
              >
                Book List Is Empty
              </Text>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "70%",
    width: "90%",
    borderRadius: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 2,
      height: 8,
    },
    alignSelf: "center",

    //alignItems: "center",
    // margin: 15,
  },
  oneBook: {
    //padding: 1,
    height: 130,
    justifyContent: "center",
    width: 350,
    backgroundColor: "lightgrey",
    borderRadius: 25,
    margin: 50,
    alignItems: "center",
  },
  card: {
    height: "90%",
    backgroundColor: "#EDF5F0",
    marginHorizontal: 10,
    borderRadius: 10,
    margin: 10,
    marginBottom: 30,
    padding: 10,
    borderColor: "#00a46c",
    borderWidth: 0.2,
  },
  categoryContainer: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    flex: 1,
  },
  categoryText: { fontSize: 15, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: "green",
    paddingBottom: 5,
    borderBottomWidth: 2,
  },
});