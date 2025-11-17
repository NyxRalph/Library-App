import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/home";
import Books from "./pages/Books";
import { books } from "./data";
import Bookinfo from "./pages/Bookinfo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import { useState, useEffect } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find((item) => +item.id === +book.id);
    if (dupeItem) {
      dupeItem.quantity += 1;
      setCart(
        cart.map((item) => {
          if (item.id === dupeItem.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            return item;
          }
        })
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  }

  function changeQuantity(book, quantity) {
    setCart((cart) =>
      cart
        .map((item) =>
          item.id === book.id
            ? {
                ...item,
                quantity: quantity > 0 ? quantity : 0,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(item) {
    setCart((cart) => cart.filter((book) => book.id !== item.id));
  }

  // function numberOfItems() {
  //   return cart.reduce((total, item) => total + item.quantity, 0);
  // }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <Router>
      <div className="App">
        <Nav cartCount={numberOfItems()} />
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
