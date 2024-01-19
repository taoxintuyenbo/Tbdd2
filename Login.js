// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const isTestMode = true;

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState(isTestMode ? "example@gmail.com" : "");
//   const [password, setPassword] = useState(isTestMode ? "**********" : "");
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/users");
//         setUsers(response.data);
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleLogin = () => {
//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (user) {
//       navigation.navigate("Main");
//       Alert.alert("Authentication Success", "Welcomback to our clothes shop");
//     } else {
//       Alert.alert("Authentication Failed", "Invalid email or password");
//     }
//   };
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Image
//           source={require("./assets/login_banner.jpeg")}
//           style={styles.bannerImage}
//         />

//         <Text style={styles.headerTitle}>Sign In</Text>
//         <Text style={styles.subHeaderTitle}>
//           Please sign in to your existing account.
//         </Text>

//         <View style={styles.formContainer}>
//           <Text style={styles.inputHeader}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="example@gmail.com"
//             value={email}
//             onChangeText={(text) => setEmail(text)}
//             keyboardType="email-address"
//           />

//           <Text style={styles.inputHeader}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="*************"
//             value={password}
//             onChangeText={(text) => setPassword(text)}
//             secureTextEntry={true}
//           />

//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.buttonText}>LOGIN</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.forgotPasswordButton}
//             onPress={() => navigation.navigate("Verification")}
//           >
//             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingBottom: 4,
//   },
//   bannerImage: {
//     width: "100%",
//     height: 250, // Adjust the height as needed
//     marginBottom: 20,
//     borderRadius: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   subHeaderTitle: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: "100%",
//   },
//   inputHeader: {
//     textTransform: "uppercase",
//     fontSize: 14,
//     marginBottom: 4,
//     fontWeight: "bold",
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 16,
//     paddingHorizontal: 10,
//   },
//   loginButton: {
//     backgroundColor: "green",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   forgotPasswordButton: {
//     marginTop: 10,
//     // fontWeight: "bold",
//   },
//   forgotPasswordText: {
//     fontSize: 14,
//     color: "blue",
//   },
// });

// export default Login;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const isTestMode = true;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(isTestMode ? "Dinhduy@gmail.com" : "");
  const [password, setPassword] = useState(isTestMode ? "123" : "");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get("https://fakestoreapi.com/users");
        const response = await axios.get(
          "https://65a7af3594c2c5762da74c03.mockapi.io/shopApp/account"
        );
        setUsers(response.data);
        console.log("User Data after Login:", response.data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleLogin = () => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      navigation.navigate("Main", {
        screen: "Profile",
        params: { userId: user.id },
      });
      Alert.alert("Authentication Success", "Welcome back to our clothes shop");
    } else {
      Alert.alert("Authentication Failed", "Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("./assets/login_banner.jpeg")}
          style={styles.bannerImage}
        />

        <Text style={styles.headerTitle}>Sign In</Text>
        <Text style={styles.subHeaderTitle}>
          Please sign in to your existing account.
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />

          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="*************"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => navigation.navigate("SignUp")} // Make sure "SignUp" is the name of your sign-up screen in the navigator
          >
            <Text style={styles.signUpButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  bannerImage: {
    width: "100%",
    height: 250, // Adjust the height as needed
    marginBottom: 20,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeaderTitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  inputHeader: {
    textTransform: "uppercase",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
  },
  forgotPasswordButton: {
    marginTop: 10,
    // fontWeight: "bold",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "blue",
  },
  signUpButton: {
    marginTop: 10,
    // Add additional styling as needed
  },
  signUpButtonText: {
    fontSize: 14,
    color: "blue",
    // Add additional styling as needed
  },
});

export default Login;
