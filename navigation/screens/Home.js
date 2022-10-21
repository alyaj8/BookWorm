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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  let [rec, setrec] = useState([]);

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
            placeholder="Search by title or for a user"
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
          height: "35%",
          backgroundColor: "#f6fff9",
          paddingHorizontal: 9,
        }}
      >
        <TouchableOpacity>
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
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              View all
            </Text>
          </View>
        </TouchableOpacity>

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

      <View
        style={{
          width: "100%",
          height: "35%",
          backgroundColor: "#f6fff9",
          paddingHorizontal: 9,
        }}
      >
        <TouchableOpacity>
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
            Most rated
          </Text>
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
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 13,
                color: "#FFF",
              }}
            >
              View all
            </Text>
          </View>
        </TouchableOpacity>

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
              height: 150,
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
