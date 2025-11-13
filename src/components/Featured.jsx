import React from "react";
import Book from "./ui/Book";
import { books } from "../data";

const Featured = () => {
  const featuredBooks = books.filter((book) => book.rating === 5);
  // Duplicate books for seamless loop
  const duplicatedBooks = [
    ...featuredBooks,
    ...featuredBooks,
    ...featuredBooks,
  ];

  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Featured <span className="purple">Books</span>
          </h2>
          <div className="carousel-wrapper carousel-left">
            <div className="carousel-track">
              {duplicatedBooks.map((book, index) => (
                <Book book={book} key={`featured-${book.id}-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
