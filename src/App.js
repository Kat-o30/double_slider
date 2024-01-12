
import React from 'react'
import SignInForm from './Components/SignInForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInForm />}></Route>
        <Route path='/home' element={<Home />}></Route> 
      </Routes>
    </BrowserRouter>
  );
}

export default App