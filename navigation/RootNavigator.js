import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import WordDetailsScreen from "../screens/WordDetailsScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator initialRouteName='Home' headerMode='none'>
    <Stack.Screen
      name='Home'
      component={HomeScreen}
      options={{ title: "Home" }}
    />
    <Stack.Screen name='WordDetails' component={WordDetailsScreen} />
  </Stack.Navigator>
);

const SearchNavigator = () => (
  <Stack.Navigator initialRouteName='Search' headerMode='none'>
    <Stack.Screen
      name='Search'
      component={SearchScreen}
      options={{
        title: "Search",
      }}
    />
    <Stack.Screen name='WordDetails' component={WordDetailsScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={({ route, navigation }) => ({
        gestureEnabled: true,
        cardOverlayEnabled: true,
        headerStatusBarHeight:
          navigation.dangerouslyGetState().routes.indexOf(route) > 0
            ? 0
            : undefined,
        ...TransitionPresets.ModalPresentationIOS,
      })}
      mode='modal'
      headerMode='none'
    >
      <Stack.Screen name='Home' component={MainNavigator} />
      <Stack.Screen name='Search' component={SearchNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
