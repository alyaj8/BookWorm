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
import { WebView } from "react-native-webview";

export default function Bookpdf({ route, navigation }) {
  const book2 = route.params;
  return (
    <WebView
      source={{
        uri: book2,
      }}
    />
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
