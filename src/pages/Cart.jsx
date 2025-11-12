import React, { useState } from "react";
import { Link } from "react-router-dom";
import Price from "../components/ui/Price";

const Cart = ({ cart, changeQuantity, removeItem, numberOfItems }) => {
  const total = cart.reduce(
    (sum, item) =>
      sum + (item.salesPrice || item.originalPrice) * item.quantity,
    0
  );

  const tax = total * 0.1;
  const shipping = total === 0 || total >= 60 ? 0 : 4.99;

  const PROMO_CODES = {
    READMORE10: {
      label: "10% off - keep turning the pages!",
      discountRate: 0.1,
    },
    WELCOME5: {
      label: "GHS 5 off your first checkout",
      discountFlat: 5,
    },
  };

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const discount = appliedPromo
    ? appliedPromo.discountRate
      ? total * appliedPromo.discountRate
      : appliedPromo.discountFlat || 0
    : 0;

  const grandTotal = Math.max(total + tax + shipping - discount, 0);

  const handleApplyPromo = (event) => {
    event.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoError("Enter a promo code to apply savings.");
      return;
    }

    const promo = PROMO_CODES[code];

    if (!promo) {
      setPromoError("That promo code isn't valid. Try READMORE10 or WELCOME5.");
      return;
    }

    setAppliedPromo({ code, ...promo });
    setPromoError("");
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  if (!cart.length) {
    return (
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row">
              <div className="book__selected--top">
                <h2 className="cart__title">Cart</h2>
              </div>
              <div className="cart__empty">
                <img src="https://i.imgur.com/sZy4ZMJ.png" alt="Empty Cart" />
                <h2>You don't have any books in your cart!</h2>
                <Link to="/books">
                  <button className="btn">Browse books</button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart">
              <div className="cart__header">
                <span className="cart__book">Book</span>
                <span className="cart__quantity">Quantity</span>
                <span className="cart__total">Price</span>
              </div>
              <div className="cart__body">
                {cart.map((book) => {
                  const price = book.salesPrice || book.originalPrice;
                  return (
                    <div className="cart__item" key={book.id}>
                      <div className="cart__book">
                        <img
                          src={book.url}
                          className="cart__book--img"
                          alt={book.title}
                        />
                        <div className="cart__book--info">
                          <span className="cart__book--title">
                            {book.title}
                          </span>
                          <span className="cart__book--price">
                            <Price originalPrice={book.originalPrice} salesPrice={book.salesPrice} />
                          </span>
                          <button
                            className="cart__book--remove"
                            onClick={() => removeItem(book)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="cart__quantity">
                        <input
                          type="number"
                          min={0}
                          max={99}
                          className="cart__input"
                          value={book.quantity}
                          onChange={(event) =>
                            changeQuantity(book, Number(event.target.value))
                          }
                        />
                      </div>
                      <div className="cart__total">
                        ${(price * book.quantity).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="total">
              <div className="total__item total__sub-total">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="total__item total__tax">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total__item total__shipping">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <form className="promo" onSubmit={handleApplyPromo}>
                <label htmlFor="promo" className="promo__label">
                  Promo code
                </label>
                <div className="promo__controls">
                  <input
                    type="text"
                    id="promo"
                    className="promo__input"
                    value={promoCode}
                    placeholder="Enter READMORE10"
                    onChange={(event) => setPromoCode(event.target.value)}
                    disabled={!!appliedPromo}
                  />
                  <button
                    type="submit"
                    className="btn btn--ghost promo__apply"
                    disabled={!!appliedPromo}
                  >
                    {appliedPromo ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoError && <p className="promo__error">{promoError}</p>}
                {appliedPromo && (
                  <div className="promo__applied">
                    <strong>{appliedPromo.code}</strong>
                    <span>{appliedPromo.label}</span>
                    <button
                      type="button"
                      className="promo__remove"
                      onClick={handleRemovePromo}
                    >
                      remove
                    </button>
                  </div>
                )}
              </form>
              {!!discount && (
                <div className="total__item total__discount">
                  <span>Promo savings</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="total__item total__price">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <p className="total__note">
                You&apos;re checking out {numberOfItems()}{" "}
                {numberOfItems() === 1 ? "book" : "books"} today.
              </p>
              <button
                className="btn btn__checkout"
                onClick={() =>
                  alert(
                    `Thanks for your purchase of ${numberOfItems()} book${
                      numberOfItems() === 1 ? "" : "s"
                    }!`
                  )
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
