import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
// import CourseSearchByName from './CourseSearchByName';
// import CourseSearchByPrice from './CourseSearchByPrice'



export default function UserView({productsData}) {

	const [products, setProducts] = useState([])

	useEffect(() => {
		console.log(productsData);

		const productsArr = productsData.map(product => {
			//only render the active courses
			if(product.isActive === true) {
				return (
					<ProductCard productProp={product} key={product._id}/>
					)
			} else {
				return null;
			}
		})

		//set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
		setProducts(productsArr)

	}, [productsData])

	return(
		<>
			{ products }
		</>
		)
}