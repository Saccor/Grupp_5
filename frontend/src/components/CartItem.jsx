import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

export function CartItem({ id, quantity, item }) {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  if (!item) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <div className="me-auto">
        <div>{item.name} </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div className="me-auto">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => decreaseCartQuantity(item.id)}
        >
          -
        </Button>{" "}
        {quantity}{" "}
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => increaseCartQuantity(item.id)}
        >
          +
        </Button>
      </div>

      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
