import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Header from './components/Header.js';
import AdminResponse from './components/AdminResponse.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from './components/UserForm';

function App() {
  return (
    <Router> 
      <Header />
      <Routes>
        <Route path="/admin" element={<AdminResponse/>} /> 
        <Route path="/user" element={<UserForm/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
