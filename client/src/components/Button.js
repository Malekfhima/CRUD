import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "../styles/theme";

export default function Button({ title, onPress, variant = "primary", style }) {
  const { theme, styles } = useTheme();
  const backgroundColor = variant === "primary" ? theme.colors.primary : "#fff";
  const color = variant === "primary" ? "#fff" : theme.colors.neutral[800];
  return (
    <Pressable
      onPress={onPress}
      style={[
        { backgroundColor, padding: 8, borderRadius: theme.radii.sm },
        style,
      ]}
    >
      <Text style={{ color, textAlign: "center", fontWeight: "600" }}>
        {title}
      </Text>
    </Pressable>
  );
}
