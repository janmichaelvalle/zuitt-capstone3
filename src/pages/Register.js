import { Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
import UserContext from '../UserContext';

export default function Register() {
    const { user } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(false);
    // State for redirection
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    function registerUser(e) {
        e.preventDefault();

        fetch('http://localhost:4005/b5/users/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobileNo: mobileNo,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Registered Successfully") {
                setFirstName('');
                setLastName('');
                setEmail('');
                setMobileNo('');
                setPassword('');
                setConfirmPassword('');

                alert("Registration successful");
                
                // Set redirectToLogin to true for redirection
                setRedirectToLogin(true);
            } else if (data.error === "Email invalid") {
                alert("Email is invalid");
            } else if (data.error === "Mobile number invalid") {
                alert("Mobile number is invalid");
            } else if (data.error === "Password must be atleast 8 characters") {
                alert("Password must be at least 8 characters");
            } else {
                alert("Something went wrong.");
            }
        });
    }

    useEffect(() => {
        setIsActive(
            firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            mobileNo !== "" &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        );
    }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

    return (
        user.id !== null ? 
        <Navigate to="/products" /> : // Redirect if user is already logged in
        redirectToLogin ? 
        <Navigate to="/login" /> : // Redirect upon successful registration
        <Form onSubmit={(e) => registerUser(e)}>
            <h1 className="my-5 text-center">Register</h1>
            <Form.Group>
                <Form.Label>First Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter First Name" 
                    required
                    value={firstName}
                    onChange={e => {setFirstName(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Last Name" 
                    required
                    value={lastName}
                    onChange={e => {setLastName(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter Email" 
                    required
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control 
                    type="tel" 
                    placeholder="Enter 11 Digit No." 
                    required
                    value={mobileNo}
                    onChange={e => {setMobileNo(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    required
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    required
                    value={confirmPassword}
                    onChange={e => {setConfirmPassword(e.target.value)}}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isActive}>Submit</Button>
        </Form>
    );
}
