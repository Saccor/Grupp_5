import React, { useContext } from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchComponent from "./SearchComponent.jsx";
import { SearchContext } from "../context/SearchContext.jsx";

export function Navbar() {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { toggleCart, cart } = useCart();
  const cartQuantity = cart.reduce((count, item) => count + item.quantity, 0);
  const location = useLocation();

  const isCheckoutOrPaymentPage = () => {
    return (
      location.pathname === "/checkout" || location.pathname === "/payment"
    );
  };

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto" style={{ fontSize: "24px", color: "black" }}>
          <Nav.Link as="a" href="/" style={{ cursor: "pointer" }}>
            Hakim Livs
          </Nav.Link>
          {!isCheckoutOrPaymentPage() && (
            <Nav.Link as={NavLink} to="/checkout">
              Varukorg
            </Nav.Link>
          )}
        </Nav>
        <div style={{ flex: 1 }}></div>
        {!isCheckoutOrPaymentPage() && (
          <div
            style={{
              width: "500px",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <SearchComponent onSearch={setSearchTerm} searchTerm={searchTerm} />
          </div>
        )}
        <div style={{ flex: 1 }}></div>
        <Button
          onClick={toggleCart}
          style={{ width: "3rem", height: "3rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <svg
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 902.86 902.86"
          >
            <g>
              <g>
                <path
                  d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                />
                <path
                  d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                  c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                  c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                  C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                  c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                   M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                  S619.162,694.432,619.162,716.897z"
                />
              </g>
            </g>
          </svg>
          {cartQuantity > 0 && (
            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                color: "white",
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {cartQuantity}
            </div>
          )}
        </Button>
      </Container>
    </NavbarBs>
  );
}
