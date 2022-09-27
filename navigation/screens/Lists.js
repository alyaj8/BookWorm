import * as React from "react";
import { View, Text } from "react-native";

export default function Lists({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        //   onPress={() => alert('This is the "lists" screen.')}///navigation.navigate('home')
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Lists
      </Text>
    </View>
  );
}
