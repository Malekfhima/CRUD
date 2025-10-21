import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import api from "../services/api";
import { useTheme } from "../styles/theme";

export default function ItemDetailScreen({ route }) {
  const { id } = route.params;
  const [item, setItem] = useState(null);
  const { styles } = useTheme();

  useEffect(() => {
    api
      .get(`/items/${id}`)
      .then((res) => setItem(res.data))
      .catch(console.error);
  }, [id]);

  if (!item)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: "100%", height: 200 }}
        />
      ) : null}
      <Text style={styles.h1}>{item.title}</Text>
      <Text style={styles.p}>{item.description}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </ScrollView>
  );
}
