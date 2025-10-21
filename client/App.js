import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./src/styles/theme";
import ItemListScreen from "./src/screens/ItemListScreen";
import ItemDetailScreen from "./src/screens/ItemDetailScreen";
import ItemFormScreen from "./src/screens/ItemFormScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Items" component={ItemListScreen} />
          <Stack.Screen
            name="ItemDetail"
            component={ItemDetailScreen}
            options={{ title: "Item" }}
          />
          <Stack.Screen
            name="ItemForm"
            component={ItemFormScreen}
            options={{ title: "Create / Edit" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
