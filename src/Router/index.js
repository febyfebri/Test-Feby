import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { TaskFromScreen, TaskListScreen } from "../Screens";

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskList" component={TaskListScreen} />
        <Stack.Screen name="TaskForm" component={TaskFromScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
