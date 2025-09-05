import React, { useState, useEffect } from "react";

function BookForm({ onAdd, onUpdate, editingBook }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    owner: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Predefined options
  const titleOptions = ["The Alchemist", "1984", "To Kill a Mockingbird", "Harry Potter", "The Great Gatsby"];
  const authorOptions = ["Paulo Coelho", "George Orwell", "Harper Lee", "J.K. Rowling", "F. Scott Fitzgerald"];
  const genreOptions = ["Fiction", "Non-Fiction", "Mystery", "Romance", "Science Fiction", "Fantasy"];
  const ownerOptions = ["John", "Mary", "Alice", "Bob", "Priyanka"];

  useEffect(() => {
    if (editingBook) {
      setBook(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingBook) {
      onUpdate(book);
      setSuccessMessage("Book updated successfully!");
    } else {
      onAdd(book);
      setSuccessMessage("Book added successfully!");
    }

    setBook({ title: "", author: "", genre: "", year: "", owner: "" });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div>
      {successMessage && (
        <div
          style={{
            background: "#4caf50",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          {successMessage}
        </div>
      )}
      <form className="book-form" onSubmit={handleSubmit}>
        {/* Title Dropdown */}
        <select name="title" value={book.title} onChange={handleChange} required>
          <option value="">Select Title</option>
          {titleOptions.map((title, index) => (
            <option key={index} value={title}>{title}</option>
          ))}
        </select>

        {/* Author Dropdown */}
        <select name="author" value={book.author} onChange={handleChange} required>
          <option value="">Select Author</option>
          {authorOptions.map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))}
        </select>

        {/* Genre Dropdown */}
        <select name="genre" value={book.genre} onChange={handleChange} required>
          <option value="">Select Genre</option>
          {genreOptions.map((genre, index) => (
            <option key={index} value={genre}>{genre}</option>
          ))}
        </select>

        {/* Year Input */}
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={book.year}
          onChange={handleChange}
          required
        />

        {/* Owner Dropdown */}
        <select name="owner" value={book.owner} onChange={handleChange} required>
          <option value="">Select Owner</option>
          {ownerOptions.map((owner, index) => (
            <option key={index} value={owner}>{owner}</option>
          ))}
        </select>

        <button type="submit">{editingBook ? "Update Book" : "Add Book"}</button>
      </form>
    </div>
  );
}

export default BookForm;
