import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import "./firebase.js"; // Import your Firebase configuration file
import './SignIn.css'; // Import the CSS file
import './Navbar';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  
  
  // Instantiate the auth service SDK
  const auth = getAuth();
  const navigate = useNavigate(); // Access navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Set loading state to true when starting authentication

    try {
      // Sign in with email and password in firebase auth service
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // The signed-in user info
      const user = userCredential.user;

      // Redirect to Navbar route after successful sign-in
      navigate("/home");

    } catch (err) {
     // Handle Errors here.
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);
      console.log(errorCode)

      switch (errorCode) {
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/user-disabled":
          setErrorMessage(
            "This email address is disabled by the administrator."
          );
          break;
        case "auth/user-not-found":
          setErrorMessage("This email address is not registered.");
          break;
        case "auth/wrong-password":
          setErrorMessage("The password is invalid.")
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }  finally {
      setLoading(false); // Set loading state to false when authentication finishes
    }
  };

  return (
    <div className='signinContainer'>
      <div className='signinContainer__box'>
        <div className='signinContainer__box__inner'>
          <h1>Sign in to continue</h1>
          <form className='signinContainer__box__form' onSubmit={handleSubmit}>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            <button type="submit" className="signinButton" disabled={loading}>Sign In</button>
            {error && <p>{errorMessage}</p>}
          </form>

          <div className='signinContainer__box__signup'>
            <p>
              Don't have an account? <Link to='/signup' target='_blank'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SignIn;