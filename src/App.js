import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Pay from './components/pages/Pay';
import MyStore from './components/pages/MyStore';
import Driver from './components/pages/Driver';
import Discover from './components/pages/Discover';

function App() {

  return (
    <Router>
      <Routes>
        {/* Display SignIn component initially */}
        <Route path="/signin" element={<SignIn />} />
        {/* Redirect from '/' to '/signin' */}
        <Route path="/" element={<Navigate to="/signin" />} />
        {/* Display Home component after successful sign-in */}
        <Route path="/home/*" element={<AuthenticatedHome />} />
        {/* Other routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/mystore" element={<MyStore />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
    </Router>
  );
}

// Component to render Home after authentication
function AuthenticatedHome() {
  return (
    <>
      
      <Home />
      
    </>
  );
}

export default App;
