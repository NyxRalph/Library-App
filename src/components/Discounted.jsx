import React from "react";
import { books } from "../data";
import Book from "./ui/Book";

const Discounted = () => {
  const discountedBooks = books.filter(book => book.salesPrice > 0);
  // Duplicate books for seamless loop
  const duplicatedBooks = [...discountedBooks, ...discountedBooks, ...discountedBooks];

  return (
    <section id="recent">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Discounted <span className="purple"> Books</span>
          </h2>
          <div className="carousel-wrapper carousel-right">
            <div className="carousel-track">
              {duplicatedBooks.map((book, index) => (
                <Book book={book} key={`discounted-${book.id}-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discounted;
