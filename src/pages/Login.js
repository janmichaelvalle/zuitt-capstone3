import { Form, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Function to handle login
  function loginUser(e) {
    e.preventDefault();

    fetch("http://localhost:4005/b5/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data.access !== "undefined") {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);
          setRedirect(true); // Set redirect to true after successful login
          Swal.fire({
            title: "Login Successful",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload(); // Reload the page
            }
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
        }
      });
  }

  // Function to retrieve user details after successful login
  const retrieveUserDetails = (token) => {
    fetch(`http://localhost:4005/b5/users/login`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          const { _id: userId, isAdmin: userIsAdmin } = data.user;
          setUser({ id: userId, isAdmin: userIsAdmin }); // Update UserContext state with retrieved user details
          setRedirect(true); // Set redirect to true after successful login
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
        }
      });
  };

  // Effect to update isActive state based on email and password
  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  return (
    <div>
      {redirect && <Navigate to="/" />} {/* Redirect when redirect is true */}
      <Form onSubmit={loginUser}>
        <h1 className="my-5 text-center">Login</h1>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {isActive ? (
          <Button variant="success" type="submit">
            Login
          </Button>
        ) : (
          <Button variant="disabled" type="submit" disabled>
            Login
          </Button>
        )}
      </Form>
    </div>
  );
}
