import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import StripeApp from "./StripeApp";
import BookComment from "./BookComment";
import { StripeProvider } from "@stripe/stripe-react-native";
import react, { useEffect, useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";

//import Map from './screens/Map';
//import Fetch from './src/Fetch';
//import {userSate,userEffect} from "react";
//import{collection, query,orderBy,onSanpshot,setDoc,doc,getDoc,getDocs} from "firebase/firestore";
import { db } from "../../config/firebase";

import {
  collection,
  doc,
  getFirestore,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function BookInfo({ route, navigation }) {
  const book = route.params;
  var Auth = getAuth();
  const uid = Auth?.currentUser?.uid;

  let [updateReadList, setupdateReadList] = useState(false);
  let [updateFavList, setupdateFavList] = useState(false);
  let [updateWishList, setupdateWishList] = useState(false);
  let [bookstar, setBookStar] = useState(0);
  let [reviewDone, setReviewDone] = useState(false);
  let [update, setUpdate] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    (async function () {
      const db = getFirestore();
      // the book must be unique its up to you how you do it by id or by ISBN
      const q = query(collection(db, "Book"), where("ISBN", "==", book.ISBN));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const book = doc.data();
        if (book?.notifiedUser && book?.notifiedUser?.length > 0) {
          const isUserExist = book?.notifiedUser?.some((item) => item === uid);
          setIsNotified(isUserExist);
        } else {
          setIsNotified(false);
        }
      });
    })();
  }, []);

  const onClickNotifyMe = async () => {
    const db = getFirestore();
    // the book must be unique its up to you how you do it by id or by ISBN
    const q = query(collection(db, "Book"), where("ISBN", "==", book.ISBN));
    setIsNotified(true);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const book = doc.data();
      let data = [];
      if (book?.notifiedUser && book?.notifiedUser?.length > 0) {
        data = [uid, ...book.notifiedUser];
      } else {
        data.push(uid);
      }
      await updateDoc(doc.ref, {
        notifiedUser: data,
      });
    });
  };

  let [disabled, setDisabled] = useState(false);
  let AddInfoToReadList = async () => {
    setDisabled(true);
    try {
      const uid = Auth?.currentUser?.uid;
      const db = getFirestore();
      const data = book;
      data.favouriteUserId = uid;
      await addDoc(collection(db, "readBookList"), data);
      book.listedInRead = true;
      setupdateReadList(true);
      setDisabled(false);
    } catch (error) {
      alert(error);
      setDisabled(false);
    }
  };
  let AddInfoToFavList = async () => {
    setDisabled(true);
    try {
      const uid = Auth?.currentUser?.uid;
      const db = getFirestore();
      const data = book;
      data.favouriteListUserId = uid;
      await addDoc(collection(db, "favoriteList"), data);
      book.listedInFav = true;
      setupdateFavList(true);
      setDisabled(false);
    } catch (error) {
      alert(error);
      setDisabled(false);
    }
  };
  let AddInfoToWishList = async () => {
    setDisabled(true);
    try {
      const uid = Auth?.currentUser?.uid;
      const db = getFirestore();
      const data = book;
      data.wishListUserId = uid;
      await addDoc(collection(db, "wishList"), data);
      book.listedInWish = true;
      setupdateWishList(true);
      setDisabled(false);
    } catch (error) {
      alert(error);
      setDisabled(false);
    }
  };

  let CheckListedInRead = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      const db = getFirestore();
      const q = query(
        collection(db, "readBookList"),
        where("favouriteUserId", "==", user.uid),
        where("id", "==", book.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        book.listedInRead = true;
        setupdateReadList(true);
      }
    });
  };
  let CheckListedInFav = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      const db = getFirestore();
      const q = query(
        collection(db, "favoriteList"),
        where("favouriteListUserId", "==", user.uid),
        where("id", "==", book.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        book.listedInFav = true;
        setupdateFavList(true);
      }
    });
  };
  let CheckListedInWish = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      const db = getFirestore();
      const q = query(
        collection(db, "wishList"),
        where("wishListUserId", "==", user.uid),
        where("id", "==", book.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        book.listedInWish = true;
        setupdateWishList(true);
      }
    });
  };

  let checkReview = () => {
    let countStar = 0;
    book?.reviews?.length > 0 &&
      Auth.onAuthStateChanged(async (user) => {
        book.reviews?.map((val, ind) => {
          countStar = countStar + +val.review;
          if (user.uid === val.comenteuseruid) {
            setReviewDone(true);
          }
        });
        setBookStar(countStar);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      // Call any action

      // Return the function to unsubscribe from the event so it gets removed on unmount
      CheckListedInRead();
      CheckListedInFav();
      CheckListedInWish();
      checkReview();
    });

    return unsubscribe;
  }, [navigation]);

  console.log(reviewDone, "=========>");
  let CheckOrder = () => {
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      try {
        const db = getFirestore();
        const q = query(
          collection(db, "orderBook"),
          where("orderUserId", "==", user.uid),
          where("id", "==", book.id)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          book.order = true;
          setupdateReadList(true);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    CheckListedInRead();
    CheckListedInFav();
    CheckListedInWish();
    CheckOrder();
  }, [navigation]);

  return (
    <SafeAreaView>
      <ImageBackground source={require("./222.jpg")} resizeMode="cover">
        <ScrollView>
          <Icon
            name="arrow-back-outline"
            size={45}
            style={{ color: "black", marginTop: 50, marginLeft: 10 }}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              height: 360,
              width: 200,
              justifyContent: "center",
              margin: "5%",
              shadowColor: "black",
              shadowOpacity: 0.6,
              shadowOffset: {
                width: 2,
                height: 8,
              },
            }}
          >
            <Image
              source={book.poster ? { uri: book.poster } : require("./222.jpg")}
              resizeMode="stretch"
              style={styles.imagePoster}
            />
          </View>

          <View
            style={{
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#EDF5F0",

              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              borderColor: "#00a46c",
              borderWidth: 0.7,
            }}
          >
            <Text
              style={{
                flew: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 20,
                paddingLeft: 10,
                paddingRight: 10,
                // fontSize: "25%",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              {book.title}
            </Text>
            <Text
              style={{
                flew: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 9,
                paddingLeft: 10,
                paddingRight: 10,
                // fontSize: "15%",
                fontSize: 15,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              by {book.author}
            </Text>

            <Rating
              startingValue={bookstar && bookstar / book.reviews?.length}
              imageSize={30}
              fractions={20}
              showRating={false}
              readonly={true}
              tintColor="#EDF5F0"
              style={{
                marginVertical: 10,
              }}
            />

            {book.reviews?.length > 0 ? (
              <Text
                style={{
                  color: "black",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                {"     "} {(bookstar / book.reviews?.length).toFixed(2)} out of
                5 {"\n"}
                {book.reviews?.length} People Reviewed
              </Text>
            ) : (
              <Text style={{ color: "black" }}>
                {" "}
                No Reviews yet {"\n     0 Poeple "}
              </Text>
            )}
            <TouchableOpacity
              style={{
                width: 150,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("BookComment", book);
              }}
            >
              <Text
                style={{
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "green",
                }}
              >
                See Reviews...
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontWeight: "bold",
                alignSelf: "flex-start",
                marginBottom: 15,
                fontSize: 16,
              }}
            >
              {"\n"}
              {"\n"}
              {"Book description: "}
            </Text>

            <Text style={{ textAlign: "justify" }}>{book.Description}</Text>
            <Text
              style={{
                fontWeight: "bold",
                alignSelf: "flex-start",
                marginBottom: 15,
                fontSize: 16,
              }}
            >
              {"\n"}
              {"\n"}
              {"Book Details: "}
            </Text>
            <Text style={{ alignSelf: "flex-start", fontWeight: "bold" }}>
              {"ISBN:"}
              {"    "}
              {book.ISBN}
              {"\n\n"}
              {"CATEGORY:"}
              {"    "}
              {book.category}
              {"\n"} {"\n"}
              {"PRICE:"}
              {"    "}
              {book.pric}
              {"\n"} {"\n"}
            </Text>
            <Text
              style={{
                flew: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 9,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 5,
                // fontSize: "15%",
                fontSize: 20,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Add Book to your list
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRadius: 25,
                  width: "48%",
                  height: 50,
                  backgroundColor: book.listedInRead ? "#aadecc" : "#00a46c",
                  paddingHorizontal: 20,
                }}
                onPress={() => AddInfoToReadList()}
                disabled={book.listedInRead || disabled}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingBottom: 1,
                    fontSize: 18,
                    marginTop: book.listedInRead ? 0 : 15,
                    paddingLeft: book.listedInRead ? 0 : 18,
                  }}
                >
                  {book.listedInRead ? "Added to Read" : "Read"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRadius: 25,
                  backgroundColor: book.listedInFav ? "#aadecc" : "#00a46c",
                  paddingHorizontal: 20,
                }}
                onPress={() => AddInfoToFavList()}
                disabled={book.listedInFav || disabled}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingBottom: 1,
                    fontSize: 18,
                    marginTop: book.listedInFav ? 0 : 15,
                    paddingLeft: book.listedInFav ? 0 : 10,
                  }}
                >
                  {book.listedInFav ? "Added to Favorite" : "Favorite"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderRadius: 25,
                  backgroundColor: book.listedInWish ? "#aadecc" : "#00a46c",
                  paddingHorizontal: 20,
                }}
                onPress={() => AddInfoToWishList()}
                disabled={book.listedInWish || disabled}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    paddingBottom: 1,
                    fontSize: 18,
                    marginTop: book.listedInWish ? 0 : 15,
                    paddingLeft: book.listedInWish ? 0 : 18,
                  }}
                >
                  {book.listedInWish ? "Added to Wish" : "Wish"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                margin: 45,
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 25,
                  backgroundColor: reviewDone ? "#aadecc" : "#00a46c",
                  width: "48%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                disabled={reviewDone}
                onPress={() => navigation.navigate("ReviewBook", book)}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {reviewDone ? "Reviewed" : "Review it.."}
                </Text>
              </TouchableOpacity>
            </View>

            {book.pdf ? (
              <View>
                <TouchableOpacity
                  style={[
                    styles.fixToText,
                    {
                      backgroundColor: book.order ? "#aadecc" : "#00a46c",
                    },
                  ]}
                  onPress={() => {
                    navigation.navigate("StripeApp", book);
                  }}
                  disabled={book.order}
                >
                  <Text style={styles.buyit}>
                    {book.order ? "BOUGHT " : "BUY IT HERE"}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  disabled={isNotified}
                  style={[
                    styles.fixToText,
                    {
                      backgroundColor: isNotified ? "#aadecc" : "#00a46c",
                    },
                  ]}
                  onPress={onClickNotifyMe}
                >
                  <Text style={styles.buyit}>
                    {isNotified ? "Under Process" : "Notify me"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fixToText: {
    width: 200,
    height: 50,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 50,
    backgroundColor: "#00a46c",
    paddingLeft: 10,
  },
  imagePoster: {
    width: "100%",
    height: "100%",
    marginTop: "40%",
    marginBottom: "67%",
  },
  buyit: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    marginRight: 18,
  },
});
