import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookModel from "../components/BookModel";
import {BiShow} from 'react-icons/bi'


const Home = () => {
  const [books, setBooks] = useState([]); // Ensure books is initialized as an array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getBooks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5555/api/v1/books/getBooks"
        );
        console.log('API response',res.data);

        // Check if res.data is an array before setting i
        setBooks(res.data.books);
        setLoading(false);
        console.log(books)
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getBooks();
  }, []);


 const [showModel , setShowModel] = useState(false)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-sky-100 p-4 rounded-lg flex flex-col gap-y-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl">{book.title}</h3>
                <div className="flex gap-x-4">
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-sky-800 text-3xl" />
                  </Link>
                  <Link to={`/books/showBook/${book._id}`}>
                    <BsInfoCircle className="text-sky-800 text-3xl" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-sky-800 text-3xl" />
                  </Link>
                </div>
              </div>
              <p className="text-lg">{book.description}</p>
              <BiShow className = "text-sky-800 text-3xl" onClick = {() => setShowModel(true)}/>
          {showModel && <BookModel book={book} onclose={() => setShowModel(false)} />}
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default Home;
