import React from 'react'
import Cards from './Cards';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Course() {

    const [book, setBook] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
            const res = await axios.get('http://localhost:4000/book');
            console.log(res.data);
            setBook(res.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        getBooks();
    }, []);

  return (
    <>
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
        <div className='mt-28 items-center justify-center text-center'>
            <h1 className='text-2xl md:text-4xl'>We're Delighted to have you <span className='text-pink-600'>Here :)</span></h1>
            <p className='mt-7 text-lg'>Dive into our ever-growing collection of stories and knowledge.Whether you're into thrillers, romance, or self-help — there's something for everyone.Start exploring and find your next favorite read today!</p>

            <Link to= "/">
                <button className='bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-4'>Back</button>
            </Link>

        </div>

        <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-4'>
            {book.map((item) => (
                <Cards key={item.id} item={item} />
            ))}
        </div>

    </div>
    </>
  )
}

export default Course