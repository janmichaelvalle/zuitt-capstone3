import { Navigate } from "react-router-dom";
import { useContext, useEffect} from "react";
import UserContext from "../UserContext";

export default function Logout(){
  // "localStorage.clear() clears info in locadStorage ensuring no info is stored in our browser"
  // localStorage.clear();
  const { unsetUser, setUser } = useContext(UserContext);

  // Clear the localStorage of the user's info
  unsetUser();

  // 
  /* 
    - Placing the "setUser" setter function inside of a useEffect is necessary because of updates within reactJS that a state of another component be updated while trying to render a different component
    - By adding the useEffect, this will allow the Logout page to render first before triggering the useEffect which changes the state of our user
   */
  useEffect(() => {
    // Set the user state back to it's original value
    setUser({
      id: null,
      isAdmin: null,
    })
  })

  // Redirect back to login
  return (
    <Navigate to="/login"/>
  )
}