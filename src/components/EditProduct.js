import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditProduct({ product, fetchData }) {
  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({}); // State to store edited product details

    // Populate editedProduct with current product details when product prop changes
    useEffect(() => {
      setEditedProduct(product);
    }, [product]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleEditProduct = () => {
    fetch(`http://localhost:4005/b5/products/${product}/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(editedProduct)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Updated Product Data:", data);
      // Fetch updated data
      fetchData();
      // Close modal
      handleClose();
    })
    .catch(error => {
      console.error("Error updating product:", error);
      // Handle error here
    });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedProduct.name || ''}
                onChange={handleInputChange}
                placeholder="Enter new product name"
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={editedProduct.description || ''}
                onChange={handleInputChange}
                placeholder="Enter new product description"
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={editedProduct.price || ''}
                onChange={handleInputChange}
                placeholder="Enter new product price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}