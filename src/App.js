import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Books from "./pages/Books";
import { books } from "./data";
import Bookinfo from "./pages/Bookinfo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { useState, useCallback, useMemo } from "react";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((book) => {
    setCart((prevCart) => {
      const dupeItem = prevCart.find((item) => +item.id === +book.id);
      if (dupeItem) {
        return prevCart.map((item) =>
          item.id === dupeItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevCart, { ...book, quantity: 1 }];
      }
    });
  }, []);

  const changeQuantity = useCallback((book, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === book.id
            ? { ...item, quantity: quantity > 0 ? quantity : 0 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((item) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== item.id));
  }, []);

  const numberOfItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => numberOfItems(), [numberOfItems]);

  return (
    <Router>
      <div className="App">
        <Nav cartCount={cartCount} />
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          render={() => (
            <Bookinfo books={books} addToCart={addToCart} cart={cart} />
          )}
        />
        <Route
          path="/cart"
          render={() => (
            <Cart
              books={books}
              cart={cart}
              changeQuantity={changeQuantity}
              removeItem={removeItem}
              numberOfItems={numberOfItems}
            />
          )}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
