import React from "react";

function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p className="empty">No books available</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Genre:</b> {book.genre}</p>
            <p><b>Year:</b> {book.year}</p>
            <p><b>Owner:</b> {book.owner}</p>
            <div className="buttons">
              <button onClick={() => onEdit(book)} className="edit-btn">✏ Edit</button>
              <button onClick={() => onDelete(book.id)} className="delete-btn">🗑 Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;
