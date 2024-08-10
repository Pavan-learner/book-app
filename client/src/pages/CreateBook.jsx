import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreateBook = () => {
  const [title, settitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5555/api/v1/books/createBook', {
        title,
        author,
        description,
        pageCount
      });
      console.log(res.data);
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoading(false);  
    }
  }

  return (
    <div className='m-4 flex justify-center'>
      <h1 className='text-3xl font-bold mb-4 text-center text-gray-800 uppercase '>Create Book</h1>
    
      <form
        className='w-1/3 p-4 bg-white rounded-lg shadow-lg'
        onSubmit={handleSubmit}
      >
        <BackButton  />  
        <div className='mb-4'>  
          <label  className='block text-gray-700 text-sm font-bold mb-2'>
            Title
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />  
        </div>
        <div className='mb-4'>  
          <label  className='block text-gray-700 text-sm font-bold mb-2'>
            Author
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />  
        </div>
        <div className='mb-4'>  
          <label  className='block text-gray-700 text-sm font-bold mb-2'>
            Description
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />  
        </div>
        <div className='mb-4'>  
          <label  className='block text-gray-700 text-sm font-bold mb-2'>
            Page Count
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            placeholder='Page Count'
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
          />  
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            {loading ? <Spinner /> : 'Create Book'}
          </button>
        </div>
      </form>
      
    </div>
  )
}

export default CreateBook