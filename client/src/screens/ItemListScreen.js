import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import ItemCard from "../components/ItemCard";
import api from "../services/api";
import { useTheme } from "../styles/theme";

export default function ItemListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const { styles, theme } = useTheme();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchItems = async (p = 1) => {
    try {
      const res = await api.raw.get(
        `/items?page=${p}&limit=12&q=${encodeURIComponent(query)}`
      );
      // res.data: { items, page, limit, total, totalPages }
      if (p === 1) setItems(res.data.items);
      else setItems((prev) => [...prev, ...res.data.items]);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

  // Refresh when screen gains focus (e.g., after returning from ItemForm)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchItems(1);
      setPage(1);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // when query changes, reset page and refetch
    setPage(1);
    fetchItems(1);
  }, [query]);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: theme.spacing.md,
          backgroundColor: theme.colors.neutral[200],
        }}
      >
        <Text style={{ fontSize: theme.typography.h1, fontWeight: "700" }}>
          Items
        </Text>
        <TextInput
          placeholder="Search items..."
          value={query}
          onChangeText={setQuery}
          style={{
            marginTop: theme.spacing.sm,
            padding: theme.spacing.sm,
            borderRadius: theme.radii.sm,
            backgroundColor: "#fff",
          }}
        />
      </View>
      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate("ItemForm")}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
      <FlatList
        data={items.filter((it) =>
          it.title.toLowerCase().includes(query.toLowerCase())
        )}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            onPress={() => navigation.navigate("ItemDetail", { id: item._id })}
            onEdit={() => navigation.navigate("ItemForm", { id: item._id })}
            onDelete={async () => {
              try {
                await api.delete(`/items/${item._id}`);
                // Remove locally and refresh
                setItems((prev) => prev.filter((p) => p._id !== item._id));
                fetchItems(1);
              } catch (err) {
                console.error("Delete failed", err);
                Alert.alert("Erreur", "Impossible de supprimer cet item.");
              }
            }}
          />
        )}
        contentContainerStyle={{ padding: theme.spacing.md }}
        numColumns={Platform.OS === "web" ? 3 : 1}
        onEndReached={() => {
          if (page < totalPages) setPage((p) => p + 1);
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
