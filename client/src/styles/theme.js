import React, { createContext, useContext } from "react";
import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    primary: "#2b6cb0", // calm blue
    accent: "#d66a4f",
    neutral: {
      50: "#fbfcfd",
      100: "#ffffff",
      200: "#f3f6f9",
      400: "#bfc8d6",
      500: "#6b7280",
      800: "#111827",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: 20,
    h2: 18,
    p: 14,
    price: 15,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
  },
  shadow: {
    sm: {
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 1 },
    },
    md: {
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
  },
};

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[100],
  },
  h1: {
    fontSize: theme.typography.h1,
    color: theme.colors.neutral[800],
    marginVertical: theme.spacing.sm,
  },
  p: { fontSize: theme.typography.p, color: theme.colors.neutral[500] },
  price: {
    fontSize: theme.typography.price,
    color: theme.colors.accent,
    marginTop: theme.spacing.sm,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  fabText: { color: "#fff", fontSize: 28 },
  card: {
    flex: 1,
    margin: 8,
    maxWidth: "30%",
    borderRadius: theme.radii.md,
    backgroundColor: theme.colors.neutral[100],
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 140, backgroundColor: "#eee" },
  cardPlaceholder: { width: "100%", height: 140, backgroundColor: "#eee" },
  cardBody: { padding: 12 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.neutral[800],
  },
  cardPrice: { color: theme.colors.accent, fontWeight: "700", marginTop: 6 },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    padding: 8,
    borderRadius: theme.radii.sm,
    backgroundColor: theme.colors.primary,
  },

  // Form styles
  label: {
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    color: theme.colors.neutral[500],
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: theme.spacing.sm,
    borderRadius: theme.radii.sm,
    backgroundColor: "#fff",
  },

  label: { marginTop: theme.spacing.sm, marginBottom: theme.spacing.xs },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: theme.spacing.sm,
    borderRadius: 6,
  },
});

const ThemeContext = createContext({ theme, styles: baseStyles });

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme, styles: baseStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default theme;
