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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
//import { LinearGradient } from "expo-linear-gradient";
//import PDFView from "react-native-view-pdf/lib/index";
//import PDFReader from "rn-pdf-reader-js";
//import Pdf from "react-native-pdf";

export default function Bookpdf({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: "#EDF5F0",
        flex: 1,
      }}
    >
      <Text>
        {"\n"} {"\n"} {"\n"}here each book pdf{" "}
      </Text>
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
