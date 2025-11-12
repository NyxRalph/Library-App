import React, { useMemo, useState } from "react";
import Book from "../components/ui/Book";

const FILTERS = [
  { id: "ALL", label: "All" },
  { id: "TOP_RATED", label: "Top rated" },
  { id: "ON_SALE", label: "On sale" },
  { id: "BUDGET", label: "Under $20" },
];

const Books = ({ books: initialBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState("DEFAULT");
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredBooks = useMemo(() => {
    let updated = initialBooks.slice();

    if (activeFilter === "TOP_RATED") {
      updated = updated.filter((book) => book.rating >= 4.5);
    } else if (activeFilter === "ON_SALE") {
      updated = updated.filter((book) => !!book.salesPrice);
    } else if (activeFilter === "BUDGET") {
      updated = updated.filter(
        (book) => (book.salesPrice || book.originalPrice) <= 20
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      updated = updated.filter((book) =>
        book.title.toLowerCase().includes(term)
      );
    }

    if (sort === "LOW_TO_HIGH") {
      updated = updated
        .slice()
        .sort(
          (a, b) =>
            (a.salesPrice || a.originalPrice) -
            (b.salesPrice || b.originalPrice)
        );
    }

    if (sort === "HIGH_TO_LOW") {
      updated = updated
        .slice()
        .sort(
          (a, b) =>
            (b.salesPrice || b.originalPrice) -
            (a.salesPrice || a.originalPrice)
        );
    }

    if (sort === "RATING") {
      updated = updated.slice().sort((a, b) => b.rating - a.rating);
    }

    return updated;
  }, [activeFilter, initialBooks, searchTerm, sort]);

  const topPicks = useMemo(
    () =>
      initialBooks
        .filter((book) => book.rating >= 4.5)
        .slice(0, 4),
    [initialBooks]
  );

  const noResults = filteredBooks.length === 0;

  return (
    <div id="books__body">
      <main id="books__main">
        <section>
          <div className="books__container">
            <div className="row">
              <div className="books__header">
                <h2 className="books__header--title section__title">
                  All Books
                </h2>
                <div className="books__controls">
                  <div className="books__search">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.79l5 4.99 1.49-1.49-4.98-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
                    </svg>
                    <input
                      type="search"
                      value={searchTerm}
                      placeholder="Search by title or keyword"
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                  </div>
                  <div className="books__filters">
                    {FILTERS.map((filter) => {
                      const isActive = activeFilter === filter.id;
                      return (
                        <button
                          key={filter.id}
                          className={`books__pill ${
                            isActive ? "books__pill--active" : ""
                          }`}
                          onClick={() =>
                            setActiveFilter(
                              isActive ? "ALL" : filter.id
                            )
                          }
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                  <select
                    id="filter"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                  >
                    <option value="DEFAULT">Sort</option>
                    <option value="LOW_TO_HIGH">Price, Low to High</option>
                    <option value="HIGH_TO_LOW">Price, High to Low</option>
                    <option value="RATING">Rating</option>
                  </select>
                </div>
              </div>
              {noResults ? (
                <div className="books__empty">
                  <h3>No books found</h3>
                  <p>
                    Try adjusting the filters or search for a different title.
                  </p>
                </div>
              ) : (
                <div className="books">
                  {filteredBooks.map((book) => (
                    <Book book={book} key={book.id} />
                  ))}
                </div>
              )}
              <section className="books__recommendations">
                <h3>Recommended for you</h3>
                <p className="section__subtitle">
                  Trending picks our community can&apos;t stop reading.
                </p>
                <div className="books books--compact">
                  {topPicks.map((book) => (
                    <Book book={book} key={`top-${book.id}`} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Books;
