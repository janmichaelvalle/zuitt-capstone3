import { Button, Modal, Form } from "react-bootstrap";

import Swal from "sweetalert2";
import { useRef, useState } from "react";

// The "{course}" paramater is {course.props.courseProp._id} coming from AdminView.js when EditCourse() is called
export default function EditProduct({product, fetchData }) {


  // state for the courseId for the fetch URL
  const [productId, setProductId] = useState('');

  // Forms state
  const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");


  // State for editCourse modals to open/close
  const [showEdit, setShowEdit] = useState(false);

  // function for opening the modal
  const openEdit = (productId) => {
    console.log("Product ID in openEdit:", productId);
    fetch(`http://localhost:4005/b5/products/${ productId }`)
    .then(res => res.json())
    .then(data => {
      // Populate all the input values with the course info that we fetched
      console.log("Fetched data in editproduct", data.product)
      setProductId(data.product._id)
      setName(data.product.name)
      setDescription(data.product.description)
      setPrice(data.product.price)
     
    })
     // Then, open the modal
     setShowEdit(true)
     console.log(openEdit)
   
  }

  // Add closeEdit function to close the modal
  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice(0)
  }

  // Add editCourse function to update the course
  const editProduct = (e) => {
    e.preventDefault();
    console.log("Form submitted", e); // Check if the form submission is triggered
    console.log("Product ID in editProduct:", productId); // Check the value of productId

    fetch(`http://localhost:4005/b5/products/${ productId }`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: name,
				description: description,
				price: price
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if(data.message === "Product updated successfully"){
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Product updated successfully"
        })
        closeEdit();
        fetchData();
      } else {
        Swal.fire({
          title: "Error!",
          icon: "Error",
          text: "Please try again"
        })
        closeEdit();
        fetchData();
      }
    })
  }


  return (
    <>
    {/* The onClick will use the openEdit function */}
      <Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

      <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editProduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                            type="number" 
                            required
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
    </>
  )
}