import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth
} from "firebase/auth";
import { useState, useEffect } from "react";
import { getAllCountries, getTimezonesForCountry } from 'countries-and-timezones';
import "./firebase.js"; // Import your Firebase configuration file
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add state for username
  const [country, setCountry] = useState(""); // Add state for country
  const [region, setRegion] = useState(""); // Add state for region
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false); // New state for success message visibility
  const [loading, setLoading] = useState(false); // New loading state
  const [countriesList, setCountriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);

  // instantiate the auth service SDK
  const auth = getAuth();

  useEffect(() => {
    // Fetch list of countries when component mounts
    const countries = getAllCountries();
    setCountriesList(Object.keys(countries));
  }, []);

  useEffect(() => {
    // Fetch list of regions when country changes
    if (country) {
      const timezones = getTimezonesForCountry(country);
      setRegionsList(timezones.map(zone => zone.name));
    }
  }, [country]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "username") setUsername(value);
    if (name === "country") {
      setCountry(value);
      // Clear region when country changes
      setRegion("");
    }
    if (name === "region") setRegion(value);
  };

  // Handle user sign up with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading state to true when starting authentication

    try {
      // create a new user with email and password
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set success message to true after successful signup
      setSuccess(true);
    } catch (err) {
      // Handle errors here
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email address is already in use by another account."
          );
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    } finally {
      setLoading(false); // Set loading state to false when authentication finishes
    }
  };

  return (
    <div className='signupContainer'>
      <div className='signupContainer__box'>
        <div className='signupContainer__box__inner'>
          {!success && <h1>Sign up to get started</h1>} {/* Render the text only if success is false */}
          {!success ? (
            <form className='signupContainer__box__form' onSubmit={handleSubmit}>
              <input
                type='email'
                placeholder='Email'
                onChange={handleChange}
                name='email'
                value={email}
              />
              <input
                type='password'
                placeholder='Password'
                onChange={handleChange}
                name='password'
                value={password}
              />
              <input
                type='text'
                placeholder='Username'
                onChange={handleChange}
                name='username'
                value={username}
              />
              <select name='country' onChange={handleChange} value={country}>
                <option value=''>Select Country</option>
                {countriesList.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
              {country && (
                <select name='region' onChange={handleChange} value={region}>
                  <option value=''>Select Region</option>
                  {regionsList.map((region, index) => (
                    <option key={index} value={region}>{region}</option>
                  ))}
                </select>
              )}
              <button type='submit' className="signinButton" disabled={loading}>Sign Up</button>
              {error && <p>{errorMessage}</p>}
            </form>
          ) : (
            <div className="success-message">
              <p>You're signed up!</p>
            </div>
          )}

          <div className='signupContainer__box__signin'>
            <p>
              Already signed up? <Link to='/signin'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
