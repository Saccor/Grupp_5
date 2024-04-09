import React, { useState, useEffect } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import axios from "axios";

export function ShoppingCart({ isOpen }) {
  const { closeCart, cartItems } = useShoppingCart();
  const [productDetails, setProductDetails] = useState({});


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products'); 
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, []);


  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Varukorg</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Totalt:{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = productDetails[cartItem.id];
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
