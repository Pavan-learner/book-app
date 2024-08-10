import React, { useEffect, useState } from 'react'
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from 'react-router-dom';


const DeleteBook = () => {
  const { id } = useParams();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  

  const deleteBook = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`http://localhost:5555/api/v1/books/deleteBook/${id}`);
      console.log(res.data); 
      setLoading(false); 
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <div>
      {loading ? <Spinner /> :'' }
      <BackButton />
      <h1 className='text-3xl font-bold mb-4 text-center text-gray-800 uppercase '>Delete Book</h1>
      <p className='text-2xl font-bold mb-4 text-center text-gray-800 uppercase '>Are you sure you want to delete this book?</p>
      <div className='flex justify-center'>
        <button onClick={deleteBook} className='bg-danger text-white px-4 py-1 rounded-lg w-fit'>Yes</button>
      </div>
    </div>
  )
}

export default DeleteBook