// // App.js
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ProductList from "./ProductList";
// import DetailProduct from "./DetailProduct";
// import SearchComponent from "./SearchComponent";
// import Cart from "./Cart";
// import Login from "./Login";
// import ProfileScreen from "./ProfileScreen";
// import CategoriesScreen from "./CategoriesScreen";
// import { CartProvider } from "./CartContext";
// import Icon from "react-native-vector-icons/FontAwesome";

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// const HomeStack = () => {
//   return (
//     <Stack.Navigator initialRouteName="HomeStackScreen">
//       <Stack.Screen
//         name="HomeStackScreen"
//         component={ProductList}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="DetailProduct" component={DetailProduct} />
//       <Stack.Screen name="Cart" component={Cart} />
//       <Stack.Screen name="Categories" component={CategoriesScreen} />
//     </Stack.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <CartProvider>
//         <Stack.Navigator
//           initialRouteName="Login"
//           screenOptions={{ headerShown: false }}
//         >
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Main">
//             {(props) => (
//               <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                   tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;
//                     if (route.name === "HomeTab") {
//                       iconName = focused ? "home" : "home";
//                     } else if (route.name === "Search") {
//                       iconName = focused ? "search" : "search";
//                     } else if (route.name === "Profile") {
//                       iconName = focused ? "user" : "user";
//                     }
//                     return <Icon name={iconName} size={size} color={color} />;
//                   },
//                 })}
//               >
//                 <Tab.Screen name="HomeTab" component={HomeStack} />
//                 <Tab.Screen name="Search" component={SearchComponent} />
//                 <Tab.Screen name="Profile" component={ProfileScreen} />
//               </Tab.Navigator>
//             )}
//           </Stack.Screen>
//         </Stack.Navigator>
//       </CartProvider>
//     </NavigationContainer>
//   );
// };
// export default App;
// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductList from "./ProductList";
import DetailProduct from "./DetailProduct";
import SearchComponent from "./SearchComponent";
import Cart from "./Cart";
import Login from "./Login";
import ProfileScreen from "./ProfileScreen";
import CategoriesScreen from "./CategoriesScreen";
import { CartProvider } from "./CartContext";
import Icon from "react-native-vector-icons/FontAwesome";
import SignUp from "./Signup";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeStackScreen">
      <Stack.Screen
        name="HomeStackScreen"
        component={ProductList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DetailProduct" component={DetailProduct} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Auth" component={AuthStackScreen} />
          <Stack.Screen name="Main">
            {(props) => (
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === "HomeTab") {
                      iconName = focused ? "home" : "home";
                    } else if (route.name === "Search") {
                      iconName = focused ? "search" : "search";
                    } else if (route.name === "Profile") {
                      iconName = focused ? "user" : "user";
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                })}
              >
                <Tab.Screen name="HomeTab" component={HomeStack} />
                <Tab.Screen name="Search" component={SearchComponent} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </CartProvider>
    </NavigationContainer>
  );
};
export default App;
