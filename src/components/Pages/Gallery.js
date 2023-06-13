import React from 'react';


import HeaderBar from "../HeaderBar/HeaderBar";
import Footer from '../Footer/Footer';
import GalleryCarousel from '../GalleryCarousel/GalleryCarousel';

export default function Gallery() {
  return (
    <div>
    <HeaderBar/>
    <GalleryCarousel/>
    <Footer/>
    </div>
  )
}
