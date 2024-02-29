import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ productId, isActive, fetchData }) {

  const archiveToggle = (productId) => {
    console.log(productId)
    fetch(`http://localhost:4005/b5/products/${productId}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Product archived successfully') {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Product successfully disabled'
        });
        fetchData();
      } else {
        Swal.fire({
          title: 'Something Went Wrong',
          icon: 'error',
          text: 'Please Try again'
        });
        fetchData();
      }
    })
    .catch(error => {
      console.error('Error archiving product:', error);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'An error occurred while archiving the product. Please try again.'
      });
      fetchData();
    });
  };

  const activateToggle = (productId) => {
    fetch(`http://localhost:4005/b5/products/${productId}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.message === 'Product activated successfully') {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Product successfully enabled'
        });
        fetchData();
      } else {
        Swal.fire({
          title: 'Something Went Wrong',
          icon: 'error',
          text: 'Please Try again'
        });
        fetchData();
      }
    })
    .catch(error => {
      console.error('Error activating product:', error);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'An error occurred while activating the product. Please try again.'
      });
      fetchData();
    });
  };

  return (
    <>
      {isActive ?
        <Button variant="danger" size="sm" onClick={() => archiveToggle(productId)}>Archive</Button>
        :
        <Button variant="success" size="sm" onClick={() => activateToggle(productId)}>Activate</Button>
      }
    </>
  );
}
