// a. Add useState and useEffect
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct'


export default function AdminView({ productsData, fetchData }) {

  console.log("productsData in Adminview", productsData)

	// b. Add state to store all courses 
	const [products, setProducts] = useState([])


	//Getting the coursesData from the courses page
	useEffect(() => {
    console.log("Products data in AdminView:", productsData);
		const productArr = productsData.map(product => {
			// Log each course to inspect its structure to pass the correct course information on the table
			console.log("product: ", product);

			// Return a table row (tr) with the relevant course information
			return (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
					{product.isActive ? "Available" : "Unavailable"}
					</td>
					{/*Pass the course id as props*/}
					<td><EditProduct product={product._id} fetchData={fetchData}/></td>
					<td><ArchiveProduct className="btn btn-danger" productId={product._id} isActive={product.isActive} fetchData={fetchData}/></td>	
				</tr>
			)
		})

		setProducts(productArr)

	}, [productsData])


	return(
		<>
			<h1 className="text-center my-4"> Admin Dashboard</h1>

			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>

				<tbody>
					{products}
				</tbody>
			</Table>	
		</>

		)
}