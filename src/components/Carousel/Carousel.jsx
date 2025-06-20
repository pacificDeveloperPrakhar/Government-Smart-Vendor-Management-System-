import React,{useState,useEffect} from 'react'
import InfinityAutoScroll from "./InfinityAutoScroll";
import GalleryScroll from "./GalleryScroll.jsx"
import ImageExtractor from '../../utils/ImageExtractor'; 
import {createPortal} from "react-dom"
import { set } from 'react-hook-form';
const ImagesImport = import.meta.glob("../../assets/showcase/*.svg");
export default function Carousel() {
    const [images, setImages] = useState([])
    const [open,setOpen]=useState(false)
    console.log(open)
    useEffect(() => {
        const loadImages = async () => {
          if (images.length === 0) {
            const images = await ImageExtractor(ImagesImport);
            setImages(images);
          }
        };
    
        loadImages();
    

    
        // cleanup funciton
        return () => {
          
        };
      }, [images]); 
    
  return (
    <div className='w-full bg-black' >
        <InfinityAutoScroll items={images} direction="right" speed="fast" size={1} open={setOpen}>
        </InfinityAutoScroll>
        {open&&createPortal(<>
<GalleryScroll images={images} className={` absolute w-full h-full scrollbar-node backdrop-blur-sm flex justify-center items-cente z-40 hide-scrollbar inset-0`} open={setOpen}/>
</>,
document.body
)}
        
    </div>
  )
}
"use client";

