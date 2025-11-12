import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Highlight from "./ui/Highlight";
import reader from "../assets/Reading a Book.svg";

const Highlights = () => {
  return (
    <section id="highlights">
      <div className="highlight__icon">
        <img className="reader" src={reader} alt="reader" />
      </div>
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Why Choose <span className="purple">Library</span>
          </h2>
          <div className="highlight__wrapper">
            <Highlight id="h_tile_1"
              title="Easy And Quick"
              para="Get access to the book you purchased online"
            />
            <Highlight id="h_tile_2"
              title="10,000+ Books"
              para="We have books in all your favourite categories"
            />
            <Highlight id="h_tile_3"
              title="Affordable"
              para="Get your hands on popular books for as little as 10GHC"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
