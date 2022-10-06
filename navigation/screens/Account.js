import * as React from "react";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { getAuth, signOut } from "firebase/auth";

export default function Account({ navigation }) {
  return (
    <View style={{ backgroundColor: "#EDF5F0" }}>
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
          <Text style={{ fontSize: 25, fontWeight: "bold", padding: 10 }}>
            {" "}
            HELLO WELCOME,
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
            {" "}
          </Text>
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
              marginTop: 20,
            }}
          >
            <Icon name="person-outline" size={30} style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 16, marginTop: 7 }}>My detailes</Text>
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
            marginTop: 20,
          }}
        >
          <Icon name="people-outline" size={30} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, marginTop: 7 }}>My friends</Text>
        </View>
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
            marginBottom: 9,
          }}
        >
          <Icon name="log-out-outline" size={30} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, marginTop: 7 }}>Log-out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
