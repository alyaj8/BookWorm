import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { db } from "../../config/firebase";
export default function EditListPrivacy({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [PrivacyOption, setPrivacyOption] = useState(0);
  let [CustomeList, setCustomeLists] = useState([]);
  const [currentActiveUser, setCurrentActiveUser] = useState("");

  const Auth = getAuth();
  const currentUser = Auth?.currentUser;

  // console.log("🚀 ~ currentActiveUser", currentActiveUser);

  const getData = async () => {
    try {
      const colRef = collection(db, "users");
      const snapshot = await getDocs(colRef);

      snapshot.forEach((doc) => {
        let user = doc.data();
        user.uid === currentUser.uid && setCurrentActiveUser(user);
      });

      console.log("data", users.length);
    } catch (error) {
      console.log(error);
    }
  };

  const Datacat = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    }
    return str;
  };

  let GetAddList = async () => {
    setLoading(true);
    setCustomeLists([]);
    try {
      let lists = [];
      Auth.onAuthStateChanged(async (user) => {
        const db = getFirestore();
        console.log(user.uid);
        const q = query(
          collection(db, "CustomLists"),
          where("List_user_mail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          lists = [];
          querySnapshot.forEach((doc) => {
            let list = doc.data();
            lists.push(list);
          });
          setCustomeLists(lists);
        } else {
          setCustomeLists([]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const ListItem = ({ title, onPress, isLocked }) => {
    return (
      <ScrollView>
      <View style={styles.bottomView}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
            color: "black",
            marginTop: 30,
            marginLeft: 30,
            marginBottom: 30,
          }}
        >
          {title}
        </Text>
        {
          <MaterialIcons
            name={isLocked ? "lock" : "lock-open"}
            size={30}
            style={{
              color: "black",
              position: "absolute",
              right: 60,
              marginTop: 20,
            }}
            onPress={onPress}
          />
        }
      </View>
      </ScrollView>
    );
  };

  const handleChangeListPrivacy = (listType) => {
    // update current user list at db
    setLoading(true);
    const db = getFirestore();
    const docRef = doc(db, "users", currentUser.uid);

    const updatedUser = {
      ...currentActiveUser,
      lists: {
        ...currentActiveUser?.lists,
        [listType]: {
          // ...currentActiveUser[listType],
          isPrivate: !currentActiveUser?.lists?.[listType]?.isPrivate,
        },
      },
    };

    setDoc(docRef, updatedUser, { merge: true })
      .then(() => {
        setCurrentActiveUser(updatedUser);
        console.log("List " + listType + " privacy updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChangeCustomListPrivacy = (list) => {
    console.log("🚀 ~ listفففففففففففف", list);
    // update current user list at db
    const docRef = doc(db, "CustomLists", list.listId);

    const updatedList = {
      ...list,
      privacy: !list?.privacy,
    };

    setDoc(docRef, updatedList, { merge: true })
      .then(() => {
        console.log("List privacy updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .finally(() => {
        GetAddList();
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
    GetAddList();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="arrow-back-outline"
            size={40}
            style={{ color: "white" }}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.bookTitle}>Edit Lists Privacy</Text>
        </View>

        {/* Read Book List */}
        <ListItem
          title="Read Book List"
          onPress={() => {
            console.log("Read Book List");
            handleChangeListPrivacy("read");
          }}
          isLocked={currentActiveUser?.lists?.read?.isPrivate}
          isLoading={loading}
        />

        {/* Favorite List */}
        <ListItem
          title="Favorite List"
          onPress={() => {
            console.log("Favorite List");
            handleChangeListPrivacy("fav");
          }}
          isLocked={currentActiveUser?.lists?.fav?.isPrivate}
          isLoading={loading}
        />

        {/* Wish List */}
        <ListItem
          title="Wish List"
          onPress={() => {
            console.log("Wish List");
            handleChangeListPrivacy("wish");
          }}
          isLocked={currentActiveUser?.lists?.wish?.isPrivate}
          isLoading={loading}
        />

        {/* CustomeList */}
        {CustomeList.length > 0 ? (
          CustomeList.map((val, ind) => {
            console.log(val);
            return (
              <View key={ind} style={styles.bottomView}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 17,
                    color: "#585a61",
                    marginTop: 30,
                    marginLeft: 30,
                    marginBottom: 30,
                  }}
                >
                  {Datacat(val.ListName, 20)}
                </Text>
                {
                  <MaterialIcons
                    name={val.privacy ? "lock" : "lock-open"}
                    size={30}
                    style={{
                      color: "black",
                      position: "absolute",
                      right: 60,
                      marginTop: 20,
                    }}
                    onPress={() => handleChangeCustomListPrivacy(val)}
                  />
                }
              </View>
            );
          })
        ) : (
          <SafeAreaView></SafeAreaView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    backgroundColor: "#00a46c",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  bottomView: {
    backgroundColor: "white",
    marginTop: 20,
    shadowColor: "#000",
    flexDirection: "row",
    marginTop: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  review: {
    // backgroundColor: "White",
    width: "90%",
    borderRadius: 10,
    textAlignVertical: "top",
    borderWidth: 1,
    alignSelf: "center",
    padding: 10,
    marginTop: 10,
  },
  DDsyleC: {
    backgroundColor: "white",
    padding: 16,
    marginTop: 20,
    borderColor: "black",
  },
  dropdown: {
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontWeight: "bold",
    fontSize: 17,
    color: "#585a61",
  },
  placeholderStyle: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#585a61",
  },
  selectedTextStyle: {
    fontSize: 16,
    marginTop: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});