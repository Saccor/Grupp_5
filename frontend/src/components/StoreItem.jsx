import PropTypes from "prop-types";
import { Button, Card, CardText } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";

StoreItem.propsTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export function StoreItem({ id, name, price, description }) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-danger">{formatCurrency(price)}</span>
        </Card.Title>
        <CardText>{description}</CardText>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100 bg-danger border border-light"
              style={{ borderRadius: "20px" }}
              onClick={() => increaseCartQuantity(id)}
            >
              Köp
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> st
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="secondary"
                size="sm"
              >
                Ta bort
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
