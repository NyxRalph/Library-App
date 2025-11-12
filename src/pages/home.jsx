import React from "react";
import Landing from "../components/landing";
import Highlights from "../components/Highlights";
import Featured from "../components/Featured";
import Discounted from "../components/Discounted";
import Explore from "../components/Explore";

import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <Landing />

      <Highlights />
      <Featured />
      <Discounted />
      <Testimonials />
      <Explore />
    </>
  );
};

export default Home;
