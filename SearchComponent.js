import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";
import axios from "axios";

const SearchComponent = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSeeProfile = (id, title) => {
    navigation.navigate("DetailProduct", { id, title });
  };

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    addToCart(product);
    navigation.navigate("Cart", { product });
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <ScrollView contentContainerStyle={styles.productContainer}>
        {filteredProducts.map((product, index) => (
          <View style={styles.productCard} key={index}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => handleSeeProfile(product.id, product.title)}
                >
                  <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxWidth: 600,
    margin: "auto",
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 0,
  },
  productCard: {
    width: "46%",
    height: 300,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 10,
    overflow: "hidden",
  },
  productImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: "50%",
    objectFit: "contain",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  profileButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    height: 40,
    overflow: "hidden",
  },
  productPrice: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SearchComponent;
