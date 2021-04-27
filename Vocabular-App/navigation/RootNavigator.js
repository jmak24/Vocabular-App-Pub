import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TransitionPresets } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import WordDetailsScreen from "../screens/WordDetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import ArchivedScreen from "../screens/ArchivedScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import MyPhrasesScreen from "../screens/MyPhrasesScreen";
import LoginScreen from "../screens/LoginScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginModal = (route, navigation) => {
  return route.name === "Login"
    ? {
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      }
    : {};
};

const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName='Home'
    screenOptions={({ route, navigation }) => {
      return LoginModal(route, navigation);
    }}
    mode={({ route }) => (route.name === "Login" ? "modal" : "card")}
    headerMode='none'
  >
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={{ title: "Home" }}
    />
    <Stack.Screen name='WordDetails' component={WordDetailsScreen} />
    <Stack.Screen name='Settings' component={SettingsScreen} />
    <Stack.Screen name='Profile' component={ProfileScreen} />
    <Stack.Screen name='UpdateProfile' component={UpdateProfileScreen} />
    <Stack.Screen name='MyPhrases' component={MyPhrasesScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='About' component={AboutScreen} />
  </Stack.Navigator>
);

const SearchNavigator = () => (
  <Stack.Navigator
    initialRouteName='Search'
    screenOptions={({ route, navigation }) => {
      return LoginModal(route, navigation);
    }}
    mode={({ route }) => (route.name === "Login" ? "modal" : "card")}
    headerMode='none'
  >
    <Stack.Screen
      name='Search'
      component={SearchScreen}
      options={{
        title: "Search",
      }}
    />
    <Stack.Screen name='WordDetails' component={WordDetailsScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
  </Stack.Navigator>
);

const ArchivedNavigator = () => (
  <Stack.Navigator initialRouteName='Archived' headerMode='none'>
    <Stack.Screen
      name='Archived'
      component={ArchivedScreen}
      options={{
        title: "Archived",
      }}
    />
    <Stack.Screen name='WordDetails' component={WordDetailsScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          const colorSelected = "#4F4F4F";
          const colorDefault = "#BABABA";
          const color = focused ? colorSelected : colorDefault;

          if (route.name === "Archived") {
            iconName = "ios-archive";
          } else {
            iconName = "ios-" + route.name.toLowerCase();
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#4F4F4F",
        inactiveTintColor: "#BABABA",
        style: {
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name='Home' component={MainNavigator} />
      <Tab.Screen name='Search' component={SearchNavigator} />
      <Tab.Screen name='Archived' component={ArchivedNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
