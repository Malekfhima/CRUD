import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, Image } from "react-native";
import api from "../services/api";
import { useTheme } from "../styles/theme";
import Button from "../components/Button";

export default function ItemFormScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { styles } = useTheme();

  useEffect(() => {
    if (id) {
      api.get(`/items/${id}`).then((res) => {
        const it = res.data;
        setTitle(it.title);
        setDescription(it.description);
        setPrice(String(it.price));
        setImageUrl(it.imageUrl);
      });
    }
  }, [id]);

  const onSave = async () => {
    if (!title || !price)
      return Alert.alert("Validation", "Title and price are required");
    const payload = { title, description, price: parseFloat(price), imageUrl };
    try {
      if (id) await api.put(`/items/${id}`, payload);
      else await api.post("/items", payload);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Error saving item";
      Alert.alert("Error", msg);
    }
  };

  return (
    <View style={[styles.container, { padding: 16 }]}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Item title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Short description"
        style={[styles.input, { minHeight: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        placeholder="0.00"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Image URL</Text>
      <TextInput
        placeholder="https://..."
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 160, marginTop: 12, borderRadius: 8 }}
          resizeMode="cover"
          onError={() => console.warn("Image failed to load")}
        />
      ) : null}
      <View style={{ marginTop: 16 }}>
        <Button title="Save" onPress={onSave} />
      </View>
    </View>
  );
}
