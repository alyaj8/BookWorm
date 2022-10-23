import * as React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function RecViewall({ navigation }) {
  return (
    <View>
      <SafeAreaView>
        <ScrollView>
          <Icon
            name="arrow-back-outline"
            size={40}
            style={{ color: "black", marginTop: 30, marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
