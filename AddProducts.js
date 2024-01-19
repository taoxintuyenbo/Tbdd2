import React, { useRef } from "react";
import { View, Text, Button } from "react-native";
import { useCart } from "./CartContext";
import { useNavigation } from "@react-navigation/native";

const AddProducts = ({ items, click, removeItem, setAddedItem }) => {
  const total = items
    .reduce((pre, cur) => {
      return pre + Number(cur.addNumber) * Number(cur.price);
    }, 0)
    .toFixed(2);

  const { addToCart } = useCart();
  const navigation = useNavigation();

  const handleAddToCart = (product) => {
    addToCart(product);
    navigation.navigate("Cart");
  };

  return (
    <View>
      <View>
        <Button title="Add to Cart" onPress={() => handleAddToCart(items)} />
      </View>
    </View>
  );
};

export default AddProducts;
