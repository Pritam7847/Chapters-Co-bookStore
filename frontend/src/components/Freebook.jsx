import React from 'react'
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from 'react';
import { useState } from 'react';

function Freebook() {

  const [book, setBook] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
            const res = await axios.get('http://localhost:4000/book');
            const data = res.data.filter((data) => data.category === "Free");
            console.log(data);
            setBook(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        getBooks();
    }, []);

    var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
        }
      ]
    };

  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
        <div>
            <h1 className='font-semibold text-xl pb-2'>Free Offered Books</h1>
        <p>Not sure where to begin? Try before you buy! Grab a free book and see what suits your shelf.</p>
        </div>

        <div>
        <Slider {...settings}>
       {book.map((data)=>(
        <Cards item={data} key={data.id} />
       ))}
      </Slider>
    </div>

    </div>
    </>
  )
}

export default Freebook