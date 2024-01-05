// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";

// const ProfileScreen = ({ route }) => {
//   const { userId } = route.params;
//   const [userData, setUserData] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `https://fakestoreapi.com/users/${userId}`
//         );
//         setUserData(response.data);
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleLogout = () => {
//     // Navigate to the Login page
//     navigation.navigate("Login");
//   };

//   const getInitials = () => {
//     if (userData && userData.name) {
//       const { firstname, lastname } = userData.name;
//       return `${firstname.charAt(0)}${lastname.charAt(0)}`;
//     }
//     return "";
//   };

//   return (
//     <View style={styles.container}>
//       {userData && (
//         <>
//           <Text style={styles.name}>
//             {`${userData.name.firstname.toUpperCase()} ${userData.name.lastname.toUpperCase()}`}
//           </Text>
//           <Text style={styles.email}>Email: {userData.email}</Text>
//           <Text style={styles.phone}>Phone: {userData.phone}</Text>
//           <Text style={styles.address}>
//             Address: {userData.address.number} {userData.address.street},{" "}
//             {userData.address.city}, {userData.address.zipcode}
//           </Text>
//           <Button title="Logout" onPress={handleLogout} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 10,
//     textTransform: "uppercase",
//   },
//   email: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   phone: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   address: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   button: {
//     padding: 20,
//     width: 20,

//     // backgroundColor: "red",
//     // borderRadius: 20,
//     margin: 10,
//     width: 200,
//   },
// });

// export default ProfileScreen;

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   PermissionsAndroid,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import Geolocation from "@react-native-community/geolocation";

// const ProfileScreen = ({ route }) => {
//   const { userId } = route.params;
//   const [userData, setUserData] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           `https://fakestoreapi.com/users/${userId}`
//         );
//         setUserData(response.data);
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   useEffect(() => {
//     // Request location permissions
//     const requestLocationPermission = async () => {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           // Get the current location
//           Geolocation.getCurrentPosition(
//             (position) => {
//               setUserLocation(position.coords);
//             },
//             (error) => {
//               console.error("Location Error:", error);
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//           );
//         } else {
//           console.log("Location permission denied");
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   const handleLogout = () => {
//     navigation.navigate("Login");
//   };

//   const getInitials = () => {
//     if (userData && userData.name) {
//       const { firstname, lastname } = userData.name;
//       return `${firstname.charAt(0)}${lastname.charAt(0)}`;
//     }
//     return "";
//   };

//   return (
//     <View style={styles.container}>
//       {userData && (
//         <>
//           <Text style={styles.name}>
//             {`${userData.name.firstname.toUpperCase()} ${userData.name.lastname.toUpperCase()}`}
//           </Text>
//           <Text style={styles.email}>Email: {userData.email}</Text>
//           <Text style={styles.phone}>Phone: {userData.phone}</Text>
//           <Text style={styles.address}>
//             Address: {userData.address.number} {userData.address.street},{" "}
//             {userData.address.city}, {userData.address.zipcode}
//           </Text>
//           {userLocation && (
//             <Text style={styles.location}>
//               Location: {userLocation.latitude}, {userLocation.longitude}
//             </Text>
//           )}
//           <Button title="Logout" onPress={handleLogout} />
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 10,
//     textTransform: "uppercase",
//   },
//   email: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   phone: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   address: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   location: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   button: {
//     padding: 20,
//     width: 20,
//     margin: 10,
//     width: 200,
//   },
// });

// export default ProfileScreen;
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Geolocation from "@react-native-community/geolocation";

const ProfileScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error("Error getting location:", error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const openGoogleMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {location ? (
        <>
          <Text>
            Your current location:{"\n"}
            Latitude: {location.latitude}
            {"\n"}
            Longitude: {location.longitude}
          </Text>
          <TouchableOpacity onPress={openGoogleMaps}>
            <Text style={{ color: "blue", marginTop: 10 }}>
              Open in Google Maps
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading geolocation...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
