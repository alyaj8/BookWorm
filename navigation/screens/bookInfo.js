import React from "react";
import {View} from "react-native";
import Book from ".source/components/book";
import Info from ".source/components/info";

const BookInfo = () => {
    return (
    
    <View style ={{ flex:1 , justifyContent:"center" , alignItem: "center"}}>
        <Book />
        <Info />
    </View>
    );
};

export default BookInfo ;