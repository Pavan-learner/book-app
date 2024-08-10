import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'


const BookDetail = () => {

  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);  
const {id}= useParams();

useEffect(() => {
  setLoading(true);

  const getBook = async () => { 
    try {
      const res = await axios.get(`http://localhost:5555/api/v1/books/getSingleBook/${id}`);
      console.log('API response',res.data);
      setBook(res.data);
      setLoading(false);

    }
    catch(error){
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
    }

    getBook();
}, [])

  return (
    <div>
      <BackButton  />
      {loading ? <Spinner /> : <div className='p-4'>
        <h1 className='text-3xl font-bold'>Book Detail</h1>
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Description: {book.description}</p>
        <p>Page Count: {book.pageCount}</p>
        <p>Published Date: {book.publishedDate}</p>
      </div>}
    </div>
  )
}

export default BookDetail