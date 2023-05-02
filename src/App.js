import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/Pages/Homepage';
import About from './components/Pages/About';
import Products from './components/Pages/Products';
import Services from './components/Pages/Services';
import Inspiration from './components/Pages/Inspiration';



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Products.js" element={<Products />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/About" element={<About />} />
        <Route path="/Inspiration" element={<Inspiration />} />
      </Routes>
    </BrowserRouter>
  );
}
