import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useStripe } from "@stripe/stripe-react-native";
import Icon from "react-native-vector-icons/Ionicons";

//ADD localhost address of your server
const API_URL = "http://localhost:19003";

const StripeApp = ({ props, navigation }) => {
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState();
  const [cardError, setCardError] = useState(false);
  // const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      setCardError(true);
      return;
    }

    //2.Fetch the intent client secret from the backend
    try {
      setLoading(true);
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        setLoading(false);
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          paymentMethodType: "Card",
        });
        console;
        if (error) {
          setLoading(false);
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          setLoading(false);
          alert("Payment Successful");
          navigation.navigate("Bookpdf");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log("errror", e.message);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <Icon
        name="arrow-back-outline"
        size={40}
        style={{ color: "black", marginTop: 60, marginLeft: 10 }}
        onPress={() => navigation.goBack()}
      />
      <Image source={require("./pay.png")} style={styles.picc}></Image>
      <View style={styles.dd}>
        <Text style={{ fontWeight: "bold", fontSize: "28" }}>Total :100$</Text>
        <CardField
          postalCodeEnabled={true}
          cardStyle={styles.card}
          style={cardError ? styles.cardContainer1 : styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardError(false);
            setCardDetails(cardDetails);
          }}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color="green" />
        ) : (
          <View style={styles.fixToText}>
            <Button
              onPress={handlePayPress}
              title="Pay now"
              style={styles.fixToText}
              color="white"
            />
          </View>
        )}
      </View>
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  cardContainer1: {
    height: 50,
    marginVertical: 30,
    borderColor: "red",
    borderWidth: 2,
  },
  fixToText: {
    width: 120,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
    backgroundColor: "#00a46c",
    marginTop: 30,
    alignSelf: "center",
    color: "#FFF",
  },
  dd: {
    //  backgroundColor: "green",
    borderColor: "#00a46c",
    borderWidth: 0.7,
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    justifyContent: "center",
    backgroundColor: "#EDF5F0",
    marginTop: 80,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderColor: "#00a46c",
    borderWidth: 0.9,
    flex: 1,
  },
  aa: {
    alignSelf: "center",
    // marginTop: -11,
  },
  picc: {
    marginTop: 50,
    height: 300,
    width: 350,
    alignSelf: "center",
  },
});
