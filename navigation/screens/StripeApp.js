import { CardField, useStripe } from "@stripe/stripe-react-native";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

//ADD localhost address of your server
const API_URL = "http://localhost:19003";

const StripeApp = ({ route, navigation }) => {
  const book = route.params;
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
    // 1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      console.log("---red", cardDetails);
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
          const Auth = getAuth();
          const uid = Auth?.currentUser?.uid;
          const db = getFirestore();
          const data = book;
          data.orderUserId = uid;
          await addDoc(collection(db, "orderBook"), data);

          navigation.navigate("Orders", book.pdf);

          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      setLoading(false);
      console.log("errror", e.message);
    }
    // 3.Confirm the payment with the card details
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#00a46c",
          height: "13%",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
          marginBottom: 15,
        }}
      >
        <Text style={styles.check}>Checkout</Text>
        <Icon
          name="arrow-back-outline"
          size={40}
          style={{ color: "black", marginTop: -44, marginLeft: -15 }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Image source={require("./pay.png")} style={styles.picc}></Image>
      <View style={styles.dd}>
        <Text style={{ fontWeight: "bold", fontSize: 28 }}>
          Total :{book.price}$
        </Text>
        <CardField
          postalCodeEnabled={true}
          cardStyle={{
            placeholderColor: cardError ? "#ff0000" : "#0000",
          }}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardError(false);
            setCardDetails(cardDetails);
          }}
        />
        {loading ? (
          <ActivityIndicator size={"large"} color="green" />
        ) : (
          <View style={styles.fixToText}>
            <TouchableOpacity
              onPress={handlePayPress}
              style={styles.fixToText}
              color="white"
            >
              <Text style={styles.text}>Pay now</Text>
            </TouchableOpacity>
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
    color: "green",
  },
  cardContainer1: {
    height: 50,
    marginVertical: 30,
    borderColor: "red",
    borderWidth: 2,
    color: "red",
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
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
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
  check: {
    alignSelf: "center",
    marginTop: 60,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
  },
});
