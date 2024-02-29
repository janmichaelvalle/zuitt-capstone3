import React, { useContext } from 'react';
import { Container } from 'react-bootstrap'; // Import Container component from react-bootstrap
import UserContext from '../UserContext';

function Home() {
    const { user } = useContext(UserContext);

    // Define the welcome message based on whether the user is logged in or not
    const welcomeMessage = user.id !== null ? `Welcome, ${user.firstName} ${user.lastName}, to our e-commerce website!` : 'Welcome to our e-commerce website!';

    return (
        <Container className="text-center" style={{ height: '100vh' }}>
            <h1>Welcome to our E-commerce Website</h1>
        </Container>
    );
}

export default Home;
