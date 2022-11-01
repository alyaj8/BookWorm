import { getAuth, signOut } from "firebase/auth";
import * as React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
export default function AdminAccount({ navigation }) {
  const showAlert = () =>
    Alert.alert(
      "Loging out ",
      "Are sure you want to log out?",
      [
        {
          text: "Cancel",
          //  onPress: () => Alert.alert("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          style: "cancel",
          onPress: async () => {
            const auth = getAuth();
            await signOut(auth);
            navigation.navigate("WelcomePage");
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  return (
    <View>
      <ScrollView>
        <View style={{ padding: 10, width: "100%", height: 150 }}>
          <TouchableOpacity>
            <Image
              source={require("./profile2.jpg")}
              style={{ width: 400, height: 140 }}
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
            HELLO WELCOME!
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
            {" "}
            Alya Aljuraywi
          </Text>
        </View>

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

        <TouchableOpacity
          onPress={showAlert}
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
          <Icon name="log-out-outline" size={30} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 16, marginTop: 7 }}>Log-out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
