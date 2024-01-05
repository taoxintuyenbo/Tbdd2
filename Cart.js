// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { useCart } from "./CartContext";

// const Cart = () => {
//   const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();

//   const handleIncreaseQuantity = (itemId) => {
//     updateCartItemQuantity(itemId, 1);
//   };

//   const handleDecreaseQuantity = (itemId) => {
//     updateCartItemQuantity(itemId, -1);
//   };

//   // Calculate the price for each product considering the quantity
//   const calculateProductPrice = (item) => {
//     return (item.addNumber * item.price).toFixed(2);
//   };

//   // Calculate the total price for all products
//   const calculateTotalPrice = () => {
//     return cartItems
//       .reduce((total, item) => total + Number(calculateProductPrice(item)), 0)
//       .toFixed(2);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Shopping Cart</Text>
//       {cartItems.length === 0 ? (
//         <Text style={styles.emptyCartText}>Your cart is empty.</Text>
//       ) : (
//         <FlatList
//           data={cartItems}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <View style={styles.cartItem}>
//               <Image source={{ uri: item.image }} style={styles.productImage} />
//               <View style={styles.productInfo}>
//                 <Text style={styles.productTitle}>{item.title}</Text>
//                 {/* <Text style={styles.productPrice}>${item.price}*quantity</Text> */}
//                 <View style={styles.quantityContainer}>
//                   <TouchableOpacity
//                     style={styles.quantityButton}
//                     onPress={() => handleDecreaseQuantity(item.id)}
//                   >
//                     <Text>-</Text>
//                   </TouchableOpacity>
//                   <Text>{item.addNumber}</Text>
//                   <TouchableOpacity
//                     style={styles.quantityButton}
//                     onPress={() => handleIncreaseQuantity(item.id)}
//                   >
//                     <Text>+</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <Text style={styles.totalPrice}>
//                   Total: ${calculateProductPrice(item)}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={styles.removeButton}
//                 onPress={() => removeFromCart(item.id)}
//               >
//                 <Text style={styles.removeButton}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}

//       {cartItems.length > 0 && (
//         <View style={styles.totalContainer}>
//           <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     maxWidth: 600,
//     margin: "auto",
//   },
//   heading: {
//     fontWeight: "bold",
//     fontSize: 24,
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   emptyCartText: {
//     fontSize: 36,
//     textAlign: "center",
//     fontStyle: "italic",
//     fontWeight: "bold", // Make the text bold
//     marginTop: 20, // Add marginTop for better spacing
//   },
//   cartItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     borderBottomWidth: 1,
//     borderColor: "gray",
//     paddingVertical: 8,
//     marginBottom: 8,
//   },
//   productImage: {
//     width: 80,
//     height: 80,
//     marginRight: 10,
//     objectFit: "contain",
//   },
//   productInfo: {
//     flex: 1,
//   },
//   // productPrice: {

//   // },
//   productTitle: {
//     height: 48,
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//     overflow: "hidden",
//   },
//   quantityContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   quantityButton: {
//     borderWidth: 1,
//     borderColor: "gray",
//     padding: 4,
//     borderRadius: 4,
//     marginHorizontal: 8,
//   },
//   removeButton: {
//     color: "red",
//     fontSize: 16,
//     fontWeight: "bold",
//   },

//   totalContainer: {
//     marginTop: 20,
//     borderTopWidth: 2,
//     borderColor: "#ccc",
//     paddingVertical: 10,
//     alignItems: "center",
//   },
//   totalText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   totalPrice: {
//     fontSize: 16,
//     marginTop: 5,
//     padding: 5,
//     fontSize: 15,
//     fontWeight: "bold",
//   },
// });
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "./CartContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getTotalQuantity,
  } = useCart();

  const handleIncreaseQuantity = (itemId) => {
    updateCartItemQuantity(itemId, 1);
  };

  const handleDecreaseQuantity = (itemId) => {
    updateCartItemQuantity(itemId, -1);
  };

  const calculateProductPrice = (item) => {
    return (item.addNumber * item.price).toFixed(2);
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + Number(calculateProductPrice(item)), 0)
      .toFixed(2);
  };

  const handlePayNow = () => {
    // Simulate payment processing (replace this with your actual payment logic)
    // For simplicity, we'll just display an alert and clear the cart
    Alert.alert(
      "Payment Successful",
      `Total Amount: $${calculateTotalPrice()}`,
      [
        {
          text: "OK",
          style: "bold",
          onPress: () => {
            clearCart(); // Clear the cart after successful payment
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecreaseQuantity(item.id)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text>{item.addNumber}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleIncreaseQuantity(item.id)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.totalPrice}>
                  Total: ${calculateProductPrice(item)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotalPrice()}</Text>
          <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      )}
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
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 36,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    marginTop: 20,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    marginBottom: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    objectFit: "contain",
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    height: 48,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    overflow: "hidden",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 4,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  removeButton: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 16,
    marginTop: 5,
    padding: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 2,
    borderColor: "#ccc",
    paddingVertical: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Cart;
