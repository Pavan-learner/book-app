import React from "react";
import { AiOutlineClose } from "react-icons/ai";


const BookModel = ({ book, onclose }) => {
  return (
    <div
      className="fixed bg-opacity-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center  "
      onClick={onclose}
    >
      <div
        className="bg-white p-4 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>{book.title}</h1>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>

      <AiOutlineClose onClick={onclose} />
    </div>
  );
};

export default BookModel;
