import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ItemCard from "../src/components/ItemCard";
import { ThemeProvider } from "../src/styles/theme";

test("renders item card and handles actions", () => {
  const item = { _id: "1", title: "Test", price: 9.99, imageUrl: "" };
  const onPress = jest.fn();
  const onEdit = jest.fn();
  const onDelete = jest.fn();

  const { getByText } = render(
    <ThemeProvider>
      <ItemCard
        item={item}
        onPress={onPress}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </ThemeProvider>
  );

  fireEvent.press(getByText("Edit"));
  fireEvent.press(getByText("Delete"));

  expect(onEdit).toHaveBeenCalled();
  expect(onDelete).toHaveBeenCalled();
  expect(getByText("Test")).toBeTruthy();
});
