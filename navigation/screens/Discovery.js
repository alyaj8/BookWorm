import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Discovry({ navigation }) {
  /* const [books, setBooks] = useState([]);
  const booksCol = collection(db, "Book");
  useEffect(() => {
    const q = query(booksCol);

    onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <View>
    
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgreen",
    alignItems: "center",
    margin: 15,
  },
  oneBook: {
    height: 150,
    justifyContent: "center",
    width: 370,
    backgroundColor: "#b1e5d3",
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
  },
});
/*  {boo.map((task) => (
        <Task
          id={task.id}
          key={task.id}
          completed={task.data.completed}
          title={task.data.title}
          description={task.data.description}
        />
      ))}*/
