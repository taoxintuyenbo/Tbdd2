// import React, { useState, useEffect } from "react";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useCart } from "./CartContext";
// import axios from "axios";
// const CategoryBar = ({
//   categories,
//   handleCategoryPress,
//   navigateToCategory,
//   selectedCategory,
// }) => {
//   return (
//     <ScrollView
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       style={styles.categoryContainer}
//     >
//       {categories.map((category, index) => (
//         <TouchableOpacity
//           key={index}
//           onPress={() => {
//             handleCategoryPress(category);
//             navigateToCategory(category);
//           }}
//           style={[
//             styles.categoryButton,
//             selectedCategory === category && styles.selectedCategoryButton,
//           ]}
//         >
//           <Text
//             style={[
//               styles.categoryButtonText,
//               selectedCategory === category &&
//                 styles.selectedCategoryButtonText,
//             ]}
//           >
//             {category}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const ProductList = () => {
//   const { addToCart } = useCart();
//   const [products, setProducts] = useState([]);
//   const [jewelry, setJewelry] = useState([]);
//   const [electronics, setElectronics] = useState([]);
//   const [mensClothing, setMensClothing] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All products");
//   const navigation = useNavigation();
//   const route = useRoute();
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProducts(response.data);

//         const responseJewelry = await axios.get(
//           "https://fakestoreapi.com/products/category/jewelery"
//         );
//         setJewelry(responseJewelry.data);

//         const responseElectronics = await axios.get(
//           "https://fakestoreapi.com/products/category/electronics"
//         );
//         setElectronics(responseElectronics.data);

//         const responseMensClothing = await axios.get(
//           "https://fakestoreapi.com/products/category/men's clothing"
//         );
//         setMensClothing(responseMensClothing.data);
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSeeProfile = (id, title) => {
//     navigation.navigate("DetailProduct", { id, title });
//   };

//   const handleAddToCart = (product) => {
//     addToCart(product);
//   };

//   const handleNavigateToCart = () => {
//     navigation.navigate("Cart");
//   };

//   const filteredProducts = products.filter((product) =>
//     product.title.toLowerCase().includes(search.toLowerCase())
//   );

//   const filteredProductsByCategory =
//     selectedCategory === "All products"
//       ? products
//       : selectedCategory === "Jewelery"
//       ? jewelry
//       : selectedCategory === "Electronics"
//       ? electronics
//       : [];

//   const handleCategoryPress = (category) => {
//     // if (route.name === "Categories") {
//     //   // If navigating back from another category, set the category to 'All products'
//     //   setSelectedCategory("All products");
//     // } else {
//     //   // Keep the current functionality
//     //   setSelectedCategory(category);
//     // }
//     setSelectedCategory("All products");
//   };

//   const navigateToCategory = (category) => {
//     if (category.toLowerCase() === "all products") {
//       setSelectedCategory("All products");
//     } else {
//       navigation.navigate("Categories", { category: category.toLowerCase() });
//     }
//   };

//   const categories = [
//     "All products",
//     "Jewelery",
//     "Electronics",
//     "Men's Clothing",
//     "Women's Clothing",
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search products"
//           value={search}
//           onChangeText={(text) => setSearch(text)}
//         />
//         <TouchableOpacity
//           style={styles.cartButton}
//           onPress={handleNavigateToCart}
//         >
//           <Text style={styles.buttonText}>
//             <Ionicons name="cart" size={25} color="#fff" />
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <CategoryBar
//         categories={categories}
//         handleCategoryPress={handleCategoryPress}
//         navigateToCategory={navigateToCategory}
//         selectedCategory={selectedCategory}
//       />

//       {search.length > 0 && (
//         <View>
//           <Text style={styles.heading}>Search Results</Text>
//           <ScrollView
//             contentContainerStyle={styles.productContainer}
//             horizontal={true}
//           >
//             {filteredProducts.map((product, index) => (
//               <View style={styles.productCard} key={index}>
//                 <Image
//                   source={{ uri: product.image }}
//                   style={styles.productImage}
//                 />
//                 <View style={styles.productInfo}>
//                   <Text style={styles.productTitle}>{product.title}</Text>
//                   <Text style={styles.productPrice}>${product.price}</Text>
//                   <View style={styles.buttonContainer}>
//                     <TouchableOpacity
//                       style={styles.addToCartButton}
//                       onPress={() => handleAddToCart(product)}
//                     >
//                       <Text style={styles.buttonText}>Add</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={styles.profileButton}
//                       onPress={() =>
//                         handleSeeProfile(product.id, product.title)
//                       }
//                     >
//                       <Text style={styles.buttonText}>Profile</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//       <Text style={styles.themostText}>Find The Most</Text>
//       <Text style={styles.luxuriousText}>Luxurious Clothes</Text>
//       <View style={styles.bannerContainer}>
//         <Image
//           source={require("./assets/banner.jpeg")}
//           style={styles.bannerImage}
//         />
//       </View>
//       <View style={styles.rowContainer}>
//         <Text style={styles.heading}>All products</Text>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate("Main", {
//               screen: "Search",
//             })
//           }
//         >
//           <Text style={styles.seeAll}>See all</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView
//         contentContainerStyle={styles.productContainer}
//         horizontal={true}
//       >
//         {products.map((product, index) => (
//           <View style={styles.productCard} key={index}>
//             <Image
//               source={{ uri: product.image }}
//               style={styles.productImage}
//             />
//             <View style={styles.productInfo}>
//               <Text style={styles.productTitle}>{product.title}</Text>
//               <Text style={styles.productPrice}>${product.price}</Text>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                   style={styles.addToCartButton}
//                   onPress={() => handleAddToCart(product)}
//                 >
//                   <Text style={styles.buttonText}>Add</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.profileButton}
//                   onPress={() => handleSeeProfile(product.id, product.title)}
//                 >
//                   <Text style={styles.buttonText}>Profile</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//       <View style={styles.rowContainer}>
//         <Text style={styles.heading}>Jewelery</Text>
//         <TouchableOpacity
//           style={styles}
//           onPress={() => navigateToCategory("Jewelery")}
//         >
//           <Text style={styles.seeAll}>See all</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.productContainer}
//         horizontal={true}
//       >
//         {jewelry.map((jewelery, index) => (
//           <View style={styles.productCard} key={index}>
//             <Image
//               source={{ uri: jewelery.image }}
//               style={styles.productImage}
//             />
//             <View style={styles.productInfo}>
//               <Text style={styles.productTitle}>{jewelery.title}</Text>
//               <Text style={styles.productPrice}>${jewelery.price}</Text>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                   style={styles.addToCartButton}
//                   onPress={() => handleAddToCart(jewelery)}
//                 >
//                   <Text style={styles.buttonText}>Add</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.profileButton}
//                   onPress={() => handleSeeProfile(jewelery.id, jewelery.title)}
//                 >
//                   <Text style={styles.buttonText}>Profile</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.rowContainer}>
//         <Text style={styles.heading}>Electronics</Text>
//         <TouchableOpacity
//           style={styles}
//           onPress={() => navigateToCategory("Electronics")}
//         >
//           <Text style={styles.seeAll}>See all</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView
//         contentContainerStyle={styles.productContainer}
//         horizontal={true}
//       >
//         {electronics.map((electronics, index) => (
//           <View style={styles.productCard} key={index}>
//             <Image
//               source={{ uri: electronics.image }}
//               style={styles.productImage}
//             />
//             <View style={styles.productInfo}>
//               <Text style={styles.productTitle}>{electronics.title}</Text>
//               <Text style={styles.productPrice}>${electronics.price}</Text>
//               <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                   style={styles.addToCartButton}
//                   onPress={() => handleAddToCart(electronics)}
//                 >
//                   <Text style={styles.buttonText}>Add</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.profileButton}
//                   onPress={() =>
//                     handleSeeProfile(electronics.id, electronics.title)
//                   }
//                 >
//                   <Text style={styles.buttonText}>Profile</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   categoryContainer: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   categoryButton: {
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginHorizontal: 5,
//     backgroundColor: "#eee",
//   },
//   selectedCategoryButton: {
//     backgroundColor: "#00cc00",
//   },
//   categoryButtonText: {
//     color: "#555",
//     fontWeight: "bold",
//   },
//   selectedCategoryButtonText: {
//     color: "#fff",
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//     maxWidth: 600,
//     margin: "auto",
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     paddingLeft: 10,
//     borderRadius: 10,
//     flex: 1,
//   },
//   cartButton: {
//     backgroundColor: "#00cc00",
//     padding: 8,
//     borderRadius: 15,
//     marginLeft: 10,
//   },
//   bannerContainer: {
//     marginBottom: 16,
//   },
//   bannerImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//     borderRadius: 10,
//   },
//   heading: {
//     fontWeight: "bold",
//     fontSize: 24,
//     textAlign: "left",
//     marginBottom: 10,
//   },
//   productContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   productCard: {
//     width: 150,
//     height: 230,
//     marginBottom: 20,
//     borderWidth: 0.8,
//     borderColor: "green",
//     borderRadius: 10,
//     overflow: "hidden",
//     marginRight: 20,
//   },
//   productImageContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//   },
//   productImage: {
//     width: "100%",
//     height: "50%",
//     objectFit: "contain",
//     marginTop: 4,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 5,
//   },
//   addToCartButton: {
//     backgroundColor: "red",
//     padding: 3,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//     alignItems: "center",
//   },
//   profileButton: {
//     backgroundColor: "green",
//     padding: 3,
//     borderRadius: 5,
//     flex: 1,
//     marginLeft: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//   },
//   productInfo: {
//     flex: 1,
//     padding: 10,
//   },
//   productTitle: {
//     fontSize: 16,
//     marginBottom: 0,
//     textAlign: "center",
//     height: 45,

//     overflow: "hidden",
//   },
//   productPrice: {
//     fontSize: 14,
//     color: "red",
//     textAlign: "center",
//     fontWeight: "bold",
//   },
//   luxuriousText: {
//     fontSize: 40,
//     fontWeight: "bold",
//     color: "#00cc66",
//   },
//   themostText: {
//     fontSize: 35,
//     fontWeight: "bold",
//   },
//   rowContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   seeAll: {
//     color: "#00cc00",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ProductList;
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "./CartContext";
import axios from "axios";
const CategoryBar = ({
  categories,
  handleCategoryPress,
  navigateToCategory,
  selectedCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleCategoryPress(category);
            navigateToCategory(category);
          }}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategoryButton,
          ]}
        >
          <Text
            style={[
              styles.categoryButtonText,
              selectedCategory === category &&
                styles.selectedCategoryButtonText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const ProductList = () => {
  const { addToCart, getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();
  const [products, setProducts] = useState([]);
  const [jewelry, setJewelry] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [mensClothing, setMensClothing] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const navigation = useNavigation();
  const route = useRoute();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);

        const responseJewelry = await axios.get(
          "https://fakestoreapi.com/products/category/jewelery"
        );
        setJewelry(responseJewelry.data);

        const responseElectronics = await axios.get(
          "https://fakestoreapi.com/products/category/electronics"
        );
        setElectronics(responseElectronics.data);

        const responseMensClothing = await axios.get(
          "https://fakestoreapi.com/products/category/men's clothing"
        );
        setMensClothing(responseMensClothing.data);
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
    addToCart(product);
  };

  const handleNavigateToCart = () => {
    navigation.navigate("Cart");
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProductsByCategory =
    selectedCategory === "All products"
      ? products
      : selectedCategory === "Jewelery"
      ? jewelry
      : selectedCategory === "Electronics"
      ? electronics
      : [];

  const handleCategoryPress = (category) => {
    // if (route.name === "Categories") {
    //   // If navigating back from another category, set the category to 'All products'
    //   setSelectedCategory("All products");
    // } else {
    //   // Keep the current functionality
    //   setSelectedCategory(category);
    // }
    setSelectedCategory("All products");
  };

  const navigateToCategory = (category) => {
    if (category.toLowerCase() === "all products") {
      setSelectedCategory("All products");
    } else {
      navigation.navigate("Categories", { category: category.toLowerCase() });
    }
  };

  const categories = [
    "All products",
    "Jewelery",
    "Electronics",
    "Men's Clothing",
    "Women's Clothing",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={handleNavigateToCart}
        >
          <Text style={styles.buttonText}>
            <Ionicons name="cart" size={25} color="#fff" />
            {totalQuantity > 0 && (
              <Text style={styles.cartQuantityText}>({totalQuantity})</Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <CategoryBar
        categories={categories}
        handleCategoryPress={handleCategoryPress}
        navigateToCategory={navigateToCategory}
        selectedCategory={selectedCategory}
      />

      {search.length > 0 && (
        <View>
          <Text style={styles.heading}>Search Results</Text>
          <ScrollView
            contentContainerStyle={styles.productContainer}
            horizontal={true}
          >
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
                      onPress={() =>
                        handleSeeProfile(product.id, product.title)
                      }
                    >
                      <Text style={styles.buttonText}>Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <Text style={styles.themostText}>Find The Most</Text>
      <Text style={styles.luxuriousText}>Luxurious Clothes</Text>
      <View style={styles.bannerContainer}>
        <Image
          source={require("./assets/banner.jpeg")}
          style={styles.bannerImage}
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.heading}>All products</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Main", {
              screen: "Search",
            })
          }
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.productContainer}
        horizontal={true}
      >
        {products.map((product, index) => (
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
      <View style={styles.rowContainer}>
        <Text style={styles.heading}>Jewelery</Text>
        <TouchableOpacity
          style={styles}
          onPress={() => navigateToCategory("Jewelery")}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.productContainer}
        horizontal={true}
      >
        {jewelry.map((jewelery, index) => (
          <View style={styles.productCard} key={index}>
            <Image
              source={{ uri: jewelery.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{jewelery.title}</Text>
              <Text style={styles.productPrice}>${jewelery.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(jewelery)}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() => handleSeeProfile(jewelery.id, jewelery.title)}
                >
                  <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.rowContainer}>
        <Text style={styles.heading}>Electronics</Text>
        <TouchableOpacity
          style={styles}
          onPress={() => navigateToCategory("Electronics")}
        >
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.productContainer}
        horizontal={true}
      >
        {electronics.map((electronics, index) => (
          <View style={styles.productCard} key={index}>
            <Image
              source={{ uri: electronics.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{electronics.title}</Text>
              <Text style={styles.productPrice}>${electronics.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(electronics)}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.profileButton}
                  onPress={() =>
                    handleSeeProfile(electronics.id, electronics.title)
                  }
                >
                  <Text style={styles.buttonText}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#eee",
  },
  selectedCategoryButton: {
    backgroundColor: "#00cc00",
  },
  categoryButtonText: {
    color: "#555",
    fontWeight: "bold",
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    maxWidth: 600,
    margin: "auto",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    flex: 1,
  },
  cartButton: {
    backgroundColor: "#00cc00",
    padding: 8,
    borderRadius: 15,
    marginLeft: 10,
  },
  bannerContainer: {
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: 150,
    height: 230,
    marginBottom: 20,
    borderWidth: 0.8,
    borderColor: "green",
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 20,
  },
  productImageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  productImage: {
    width: "100%",
    height: "50%",
    objectFit: "contain",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: "red",
    padding: 3,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  profileButton: {
    backgroundColor: "green",
    padding: 3,
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
    marginBottom: 0,
    textAlign: "center",
    height: 45,

    overflow: "hidden",
  },
  productPrice: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
  luxuriousText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#00cc66",
  },
  themostText: {
    fontSize: 35,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  seeAll: {
    color: "#00cc00",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartQuantityText: {
    // position: "absolute",
    right: 0,
    bottom: 50,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProductList;
