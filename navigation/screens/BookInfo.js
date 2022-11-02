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
  Button,
  Share,
} from "react-native";
import React from "react";
import StripeApp from "./StripeApp";
import BookComment from "./BookComment";
import { StripeProvider } from "@stripe/stripe-react-native";
import react, { useEffect, useState } from "react";
import { Rating, AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
//import Map from './screens/Map';
//import Fetch from './src/Fetch';
//import {userSate,userEffect} from "react";
//import{collection, query,orderBy,onSanpshot,setDoc,doc,getDoc,getDocs} from "firebase/firestore";
import { db } from "../../config/firebase";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
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
  let [AllLists, setAllLists] = useState([]);
  let [AlreadyList, setAlreadyList] = useState([]);
  const [ListName, setListName] = useState("");
  const [isFocus, setIsFocus] = useState(false);

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
      const data2 = {
        category: data.category,
        ISBN: data.ISBN,
        user_uid: uid,
      };
      book.listedInFav = true;
      setupdateFavList(true);
      setDisabled(false);
      await addDoc(collection(db, "Recommendation"), data2);
    } catch (error) {
      alert(error);
      setDisabled(false);
    }
  };
  let AddCustomeList = async () => {
    setDisabled(true);
    try {
      let flag = true;
      AlreadyList.length > 0 &&
        AlreadyList.map((val) => {
          if (val === ListName) {
            flag = false;
          }
        });
      if (flag === true) {
        const uid = Auth?.currentUser?.uid;
        const db = getFirestore();
        const data = book;
        data.listName = ListName;
        data.user_uid = uid;
        await addDoc(collection(db, "BookCustomeLists"), data);
        AlreadyList.push(ListName);
        setAlreadyList(AlreadyList);
        alert("This book is added Successfully to List");
      } else {
        alert("This book is already added to the List");
      }
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
  let CheckAddList = () => {
    let ALList = [];
    const Auth = getAuth();
    Auth.onAuthStateChanged(async (user) => {
      console.log(user.uid);
      const db = getFirestore();
      const q = query(
        collection(db, "BookCustomeLists"),
        where("user_uid", "==", user.uid),
        where("id", "==", book.id)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          ALList.push(doc.data().listName);
        });
        setAlreadyList(ALList);
        setUpdate(true);
      }
    });};
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
  let GetAddList = async () => {
    setAllLists([]);

    try {
      let lists = [];
      const Auth = getAuth();
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();
        const q = query(
          collection(db, "CustomLists"),
          where("List_user_id", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            let list = doc.data();
            list.label = list.ListName;
            list.value = list.ListName;

            lists.push(list);
          });
          setAllLists(lists);
        } else {
          setAllLists([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      GetAddList();
      CheckAddList();
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
    GetAddList();
    CheckAddList();
  }, [navigation]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <ImageBackground source={require("./222.jpg")} resizeMode="cover">
        <ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Icon
              name="arrow-back-outline"
              justifyContent="space-between"
              size={45}
              style={{ color: "black", marginTop: 50, marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          </View>
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
              disabled={book.reviews?.length == null ? true : false}
            >
              <Text
                style={{
                  color: book.reviews?.length > 0 ? "green" : "grey",
                  textDecorationLine: "underline",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {book.reviews?.length > 0 ? "See Reviews.." : "No Reviews.."}
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                flew: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 9,
                paddingLeft: 1,
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

              <Icon
                name={book.listedInRead ? "book" : "book-outline"}
                size={35}
                style={{ marginRight: 19 }}
                onPress={() => AddInfoToReadList()}
                disabled={book.listedInRead || disabled}
              />
              <Icon
                name={book.listedInFav ? "heart" : "heart-outline"}
                size={35}
                style={{ marginRight: 19 }}
                onPress={() => AddInfoToFavList()}
                disabled={book.listedInFav || disabled}
              />
              <Icon
                name={book.listedInWish ? "bookmark" : "bookmark-outline"}
                size={35}
                style={{ marginRight: 19 }}
                onPress={() => AddInfoToWishList()}
                disabled={book.listedInWish || disabled}
              />
            </View>
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
              {`ISBN: ${book.ISBN}\n\n`}
              {`CATEGORY: ${book.category}\n\n`}
              {!!book.pric && `PRICE: ${book.pric}$\n\n`}
            </Text>

            {AllLists.length > 0 &&
              (!book.listed ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    borderRadius: 25,
                    backgroundColor: book.listed ? "#aadecc" : "#00a46c",
                    paddingHorizontal: 20,
                    marginTop: 10,
                    width: "90%",
                  }}
                >
                  <Dropdown
                    borderColor="black"
                    placeholderStyle={styles.placeholderStyle}
                    data={AllLists}
                    maxHeight={300}
                    style={{
                      width: "90%",
                      color: "white",
                    }}
                    selectedTextStyle={{
                      color: "white",
                    }}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? "Add to custom lists" : "..."}
                    value={ListName}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setListName(item.value);
                      setIsFocus(false);
                    }}
                    // disabled={disabled}
                  />
                  {ListName !== "" && (
                    <TouchableOpacity onPress={() => AddCustomeList()}>
                      <MaterialIcons
                        name="add"
                        size={36}
                        style={{ color: "white" }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  
                >
                  
                </TouchableOpacity>
              ))}
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
                    {isNotified ? "Under Process" : "Notify me for pdf"}
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
  placeholderStyle:{
  textAlign:"center",
  fontWeight: "bold",
  paddingLeft:45,
  },
});
