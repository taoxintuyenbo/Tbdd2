// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import axios from "axios";

// const SignUp = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleSignUp = async () => {
//     if (password !== confirmPassword) {
//       Alert.alert(
//         "Password Mismatch",
//         "The passwords you entered do not match."
//       );
//       return;
//     }
//     try {
//       const response = await axios.post(
//         "https://65a7af3594c2c5762da74c03.mockapi.io/shopApp/account",
//         {
//           name,
//           email,
//           phone,
//           password,
//         }
//       );
//       if (response.status === 201) {
//         Alert.alert("Sign Up Success", `Welcome ${response.data.name}!`);
//         navigation.navigate("Login");
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Alert.alert("Sign Up Failed", "An error occurred during sign up.");
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text style={styles.headerTitle}>Sign Up</Text>
//         <Text style={styles.subHeaderTitle}>Create a new account.</Text>

//         <View style={styles.formContainer}>
//           <Text style={styles.inputHeader}>Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your name"
//             value={name}
//             onChangeText={setName}
//             keyboardType="username"
//           />

//           <Text style={styles.inputHeader}>Email</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//           />

//           <Text style={styles.inputHeader}>Phone</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your phone number"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-number"
//           />

//           <Text style={styles.inputHeader}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry={true}
//           />

//           <Text style={styles.inputHeader}>Confirm Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Confirm your password"
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             secureTextEntry={true}
//           />

//           <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
//             <Text style={styles.buttonText}>SIGN UP</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={() => navigation.navigate("Login")}
//           >
//             <Text style={styles.loginButtonText}>
//               Already have an account? Log In
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingBottom: 4,
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
//   signUpButton: {
//     backgroundColor: "blue",
//     padding: 10,
//     borderRadius: 5,
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   loginButton: {
//     padding: 10,
//     alignItems: "center",
//   },
//   loginButtonText: {
//     fontSize: 14,
//     color: "blue",
//   },
// });

// export default SignUp;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signedUp, setSignedUp] = useState(false);

  const checkEmailExists = async (email) => {
    try {
      const emailCheckResponse = await axios.get(
        `https://65a7af3594c2c5762da74c03.mockapi.io/shopApp/account?email=${email}`
      );

      if (emailCheckResponse.data.length > 0) {
        // Alert.alert("Email Already Exists", "Please use a different email.");
        return;
      }
    } catch (error) {
      console.error("API Error:", error);
      return 1;
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Incomplete Information", "Please fill in all the fields.");
      return;
    }

    // Validation for numeric phone number
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert(
        "Invalid Phone Number",
        "Phone number should contain only numbers."
      );
      return;
    }

    // Validation for alphanumeric names and passwords
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    if (!alphanumericRegex.test(name) || !alphanumericRegex.test(password)) {
      Alert.alert(
        "Invalid Characters",
        "Name and password should contain only letters and numbers."
      );
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "The passwords you entered do not match."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "The passwords you entered do not match."
      );
      return;
    }

    const isEmailExists = await checkEmailExists(email);

    if (!isEmailExists) {
      Alert.alert("Email Already Exists", "Please use a different email.");
      return;
    }

    try {
      const response = await axios.post(
        "https://65a7af3594c2c5762da74c03.mockapi.io/shopApp/account",
        {
          name,
          email,
          phone,
          password,
        }
      );
      if (response.status === 201) {
        Alert.alert("Sign Up Success", `Welcome ${response.data.name}!`);
        setSignedUp(true);
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Sign Up Failed", "An error occurred during sign up.");
    }
  };

  useEffect(() => {
    if (signedUp) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [signedUp, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <Text style={styles.subHeaderTitle}>Create a new account.</Text>

        <View style={styles.formContainer}>
          <Text style={styles.inputHeader}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />

          <Text style={styles.inputHeader}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="default"
          />

          <Text style={styles.inputHeader}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
            keyboardType="numeric"
          />

          <Text style={styles.inputHeader}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Text style={styles.inputHeader}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 4,
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
  signUpButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "900",
  },
  loginButton: {
    padding: 10,
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: 14,
    color: "blue",
  },
});

export default SignUp;
