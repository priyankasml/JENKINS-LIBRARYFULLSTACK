import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import BookList from "./BookList";
import "../App.css";

const API_URL = "http://localhost:8081/api/books";

function LibraryManager() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ Global success message

  // Fetch books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Add book
  const addBook = async (book) => {
    try {
      const response = await axios.post(API_URL, book);
      setBooks([...books, response.data]);
      setSuccessMessage("Book added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Update book
  const updateBook = async (updatedBook) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedBook.id}`, updatedBook);
      setBooks(books.map((b) => (b.id === updatedBook.id ? response.data : b)));
      setEditingBook(null);
      setSuccessMessage("Book updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Delete book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks(books.filter((book) => book.id !== id));
      setSuccessMessage("Book deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const startEdit = (book) => {
    setEditingBook(book);
  };

  return (
    <div className="library-container">
      <h2 className="title">📚 Library Manager</h2>

      {/* Global success message */}
      {successMessage && (
        <div
          style={{
            background: "#4caf50",
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {successMessage}
        </div>
      )}

      <BookForm
        onAdd={addBook}
        onUpdate={updateBook}
        editingBook={editingBook}
      />
      <BookList books={books} onEdit={startEdit} onDelete={deleteBook} />
    </div>
  );
}

export default LibraryManager;
