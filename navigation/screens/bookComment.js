import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import Icon from "react-native-vector-icons/Ionicons";
import Reviewbook from "./Reviewbook";

export default class BookComment extends Component {
 
  render() {
    let book = this.props.route.params;
    console.log(book);

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon
              name="arrow-back-outline"
              size={40}
              style={{ color: "black" }}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={styles.bookTitle}>
              {" "}
              Comments
              {"\n"} {book.title}{" "}
            </Text>
          </View>
          {book.reviews?.length > 0 ? (
            <FlatList
              style={styles.root}
              data={book.reviews}
              extraData={this.state}
              scrollEnabled={true}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              keyExtractor={(item) => {
                return item.comenteuseruid;
              }}
              renderItem={(item) => {
                console.log(item.item);
                let review = item.item;
                return (
                  <View style={styles.container1}>
                    <View style={styles.content}>
                      <View style={styles.contentHeader}>
                        <Text style={styles.name}>{review.commentuser}</Text>
                        <Text style={styles.time}>
                          {review.date}
                          {"   "} {review.time}
                        </Text>
                      </View>
                      <Rating
                        imageSize={25}
                        fractions={20}
                        showRating={false}
                        readonly={true}
                        startingValue={review.review}
                        reviews={[]}
                        style={{
                          marginVertical: 20,
                          marginLeft: 200,
                        }}
                      />
                      <Text rkType="primary3 mediumLine">{review.comment}</Text>
                    </View>
                  </View>
                );
              }}
            />
          ) : (
            <Text
              style={{
                marginTop: 200,
                fontSize: 30,
                color: "grey",
                fontWeight: "bold",
                // alignItems: "center",
                // alignSelf: "center",
                textAlign: "center",
              }}
            >
              No Review Yet
            </Text>
          )}
        </View>
        <View style={{ marginLeft: 320, marginTop: 15, marginBottom: 15 }}>
          <Icon
            name="add-circle"
            size={55}
            style={{ color: "#00a46c" }}
            marginLeft={50}
            onPress={() => this.props.navigation.navigate("ReviewBook", book)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: -5,
  },
  root: {
    backgroundColor: "#ffffff",
  },
  container1: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    alignContent: "center",
    backgroundColor: "#00a46c",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
