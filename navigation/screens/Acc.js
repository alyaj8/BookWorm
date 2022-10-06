import * as React from "react";

import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Acc({ navigation }) {
  return (
    <Icon
      name="arrow-back-outline"
      size={45}
      style={{ color: "black", marginTop: 50, marginLeft: 10 }}
      onPress={() => navigation.navigate("Account")}
    />
  );
}
