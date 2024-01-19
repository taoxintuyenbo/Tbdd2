import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useCart } from "./CartContext";
import axios from "axios";

const DetailProduct = ({ route }) => {
  const { id, title } = route.params;
  const [productDetails, setProductDetails] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          );
          setProductDetails(response.data);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (productDetails) {
      addToCart({
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        image: productDetails.image,
        addNumber: 1, // Set initial quantity to 1
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.productContainer}>
        <View style={styles.productImageContainer}>
          {productDetails && (
            <Image
              source={{ uri: productDetails.image }}
              style={styles.productImage}
            />
          )}
        </View>
        <View style={styles.productDetails}>
          {productDetails && (
            <>
              <Text style={styles.details}>
                Description: {productDetails.description}
              </Text>
              <Text style={styles.details}>
                Price:
                <Text style={[styles.details, styles.price]}>
                  ${productDetails.price}
                </Text>
              </Text>
              <View style={styles.ratingContainer}>
                {productDetails && (
                  <Text style={styles.rating}>
                    {productDetails.rating.rate}
                    <Ionicons name="star" size={25} color="#ffd700" />
                  </Text>
                )}
                <Text style={styles.rating}>
                  ({productDetails.rating.count})
                  <Ionicons name="heart" size={25} color="#ffd700" />
                </Text>
              </View>
            </>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAddToCart} // Call the function when the button is pressed
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: "auto",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "bold",
  },
  productContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  productImageContainer: {
    marginBottom: 10,
  },
  productImage: {
    width: 400,
    height: 200,
    objectFit: "contain",
  },
  productDetails: {
    padding: 10,
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
    fontSize: 20,
    // fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    color: "red",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rating: {
    flexDirection: "row",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetailProduct;
