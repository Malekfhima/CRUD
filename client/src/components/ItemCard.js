import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useTheme } from "../styles/theme";
import Button from "./Button";

export default function ItemCard({ item, onPress, onEdit, onDelete }) {
  const { styles } = useTheme();
  return (
    <View style={[styles.card, styles.shadow && styles.shadow.md]}>
      <Pressable onPress={onPress} accessibilityRole="button">
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
        ) : (
          <View style={styles.cardPlaceholder} />
        )}
      </Pressable>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </Text>
        <Text style={styles.cardPrice}>${item.price}</Text>
        <View style={styles.cardActions}>
          <Button
            title="Edit"
            onPress={onEdit}
            variant="secondary"
            style={{ marginRight: 8 }}
          />
          <Button title="Delete" onPress={onDelete} variant="secondary" />
        </View>
      </View>
    </View>
  );
}
