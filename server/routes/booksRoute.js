import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// * CRUD Operations
router.post("/createBook", async (req, res) => {
  const { title, author, description, pageCount } = req.body;

  try {
    const existingBook = await Book.findOne({ title });

    if (existingBook) {
      res.status(400).send("Book exist already");
    } else {
      const book = await Book.create({
        title,
        author,
        description,
        pageCount,
      });
    }
    res.status(201).send("Book created successfully");
  } catch (error) {
    console.log(error);
  }
});

router.get("/getBooks", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    // console.log('Fetched Books:', allBooks); // Log fetched books
    res.status(200).send({
      total_books: allBooks.length,
      books: allBooks,
    });
  } catch (error) {
    console.log('Error while fetching books:', error); // Log detailed error
    res.status(400).send("Error while fetching books");
  }
});

router.get("/getSingleBook/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleBook = await Book.findById(id);

    if (singleBook) {
      res.status(200).send(singleBook);
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while fetching books details");
  }
});

router.delete("/deleteBook/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (deletedBook) {
      res.status(200).send({
        message: "Book Deleted Successfully",
      });
    } else {
      res.status(404).send("Book not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while deleting book");
  }
});

router.put("/updateBook/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, description, pageCount } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, {
      title,
      author,
      description,
      pageCount,
    });

    if (!updatedBook) {
      res.status(404).send({
        message: "Book not found",
      });
    } else {
      res.status(200).send({
        updatedBook,
        message: "Book updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while updating book");
  }
});


export default router;