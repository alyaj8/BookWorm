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
import { AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/Ionicons";

export default class BookComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          name: "shatha",
          comment:
            "n short, this book is meant to help us all lead more meaningful lives. But it’s also a provocative social commentary. We live in a society, Brooks argues, that celebrates freedom, that tells us to be true to ourselves.",
        },

        {
          id: 2,
          name: "Reem",
          comment:
            "n short, this book is meant to help us all lead more meaningful lives. But it’s also a provocative social commentary. We live in a society, Brooks argues, that celebrates freedom, that tells us to be true to ourselves.",
        },
      ],
    };
  }

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
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text style={styles.bookTitle}>{book.title} </Text>
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
                      <AirbnbRating
                        defaultRating={review.review}
                        reviews={[]}
                        isDisabled={true}
                        size={20}
                        ratingContainerStyle={{
                          marginBottom: 20,
                          marginTop: -30,
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
                textAlign:"center"
              }}
            >
              No Review Yet
            </Text>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: "7%",
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: "5%",
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
});
