import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = (productId) => {
    fetch(`http://localhost:4005/b5/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (
          data.product &&
          Array.isArray(data.product) &&
          data.product.length === 1
        ) {
          setProduct(data.product[0]); // Assuming the first element is the desired product
        } else {
          console.error("Invalid product data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleCheckout = () => {
    const cartItem = {
      productId: product._id, // Assuming product ID is available in the product object
      quantity: quantity,
      subtotal: product.price * quantity, // Calculate the subtotal based on product price and quantity
    };

    // Add the product to the cart
    fetch("http://localhost:4005/b5/carts/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ cartItems: [cartItem] }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Added to cart:", data);
        // If the product is successfully added to the cart, proceed with the checkout
        if (!data.error) {
          // Checkout the order
          fetch("http://localhost:4005/b5/orders/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Checkout successful:", data);
              // Show success modal with product details
              Swal.fire({
                icon: "success",
                title: "Checkout Successful",
                html: `
                  <p>Your order has been placed successfully!</p>
                  <p><strong>Product Name:</strong> ${product.name}</p>
                  <p><strong>Quantity:</strong> ${quantity}</p>
                  <p><strong>Subtotal:</strong> PHP ${cartItem.subtotal}</p>
                  <p><strong>Order ID:</strong> ${data.orderDetails._id}</p>
                `,
              });
              // Redirect the user to the order confirmation page
              // You can use react-router-dom's useHistory hook here
            })
            .catch((error) => {
              console.error("Error checking out:", error);
              // Handle error scenario
            });
        } else {
          console.error("Error adding to cart:", data.error);
          // Handle error scenario
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        // Handle error scenario
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          {product && (
            <Card>
              <Card.Body className="text-center">
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>PHP {product.price}</Card.Text>
                <Form.Group className="d-flex justify-content-center align-items-center">
                  <Form.Label className="mr-2">Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    style={{ width: "60px" }}
                    className="text-center" // Center the text inside the input field
                  />
                </Form.Group>
                {!user.isAdmin && user.id !== null ? (
                  <Button variant="primary" onClick={handleCheckout}>
                    Checkout
                  </Button>
                ) : user.id === null ? (
                  <Link className="btn btn-danger btn-block" to="/login">
                    Log in to Checkout
                  </Link>
                ) : null}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}
