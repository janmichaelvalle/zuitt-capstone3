import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';


export default function Products(){

	const {user} = useContext(UserContext)

	const [products, setProducts] = useState([]);

  const fetchData = () => {
    let fetchURL = user.isAdmin === true 
    ? `http://localhost:4005/b5/products/all`
    : `http://localhost:4005/b5/products/`;

    fetch(fetchURL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log("Fetched data:", data);
        if (typeof data.message !== "string"){
            console.log("Products to set state:", data.allProducts); 
            setProducts(data.allProducts);
        } else {
            setProducts([]);
        }
    });
};



	useEffect(() => {

		fetchData()


	}, [])
	return(
		
		<>
			{
				(user.isAdmin === true) ?
					<AdminView productsData={products} fetchData={fetchData} />

				:

					<UserView productsData={products} />
			}
		</>
		)
}