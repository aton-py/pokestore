import React from "react";
import Button from "../Button";
import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { GoDash, GoPlus } from "react-icons/go";

const Cart = ({
  switchStore,
  isOpenCart,
  setIsOpenCart,
  cartData,
  setCartData,
  totalPrice,
  setTotalPrice,
  setModalBuy,
}) => {
  function increment(item) {
    const array = cartData;

    array.forEach((cart) => {
      if (cart.id === item.id) {
        cart.count += 1;
        setCartData([...array]);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        setTotalPrice(
          array.reduce(
            (total, { price = 0, count }) => total + count * price,
            0
          )
        );
        return localStorage.setItem(
          "totalPrice",
          JSON.stringify(
            array.reduce(
              (total, { price = 0, count }) => total + count * price,
              0
            )
          )
        );
      }
    });
  }

  function decrement(item) {
    const array = cartData;

    array.forEach((cart) => {
      if (cart.id === item.id) {
        if (cart.count > 1) {
          cart.count -= 1;
          setCartData([...array]);
          localStorage.setItem("cartData", JSON.stringify(cartData));
          setTotalPrice(
            array.reduce(
              (total, { price = 0, count }) => total + count * price,
              0
            )
          );
          return localStorage.setItem(
            "totalPrice",
            JSON.stringify(
              array.reduce(
                (total, { price = 0, count }) => total + count * price,
                0
              )
            )
          );
        }
      }
    });
  }

  const removeFromCart = (item) => {
    setCartData(cartData.filter((cart) => cart.id !== item.id));
    setTotalPrice(
      cartData
        .filter((cart) => cart.id !== item.id)
        .reduce((total, { price = 0, count }) => total + count * price, 0)
    );
    localStorage.setItem(
      "cartData",
      JSON.stringify(cartData.filter((cart) => cart.id !== item.id))
    );

    return localStorage.setItem(
      "totalPrice",
      JSON.stringify(
        cartData
          .filter((cart) => cart.id !== item.id)
          .reduce((total, { price = 0, count }) => total + count * price, 0)
      )
    );
  };

  if (isOpenCart === true) {
    return (
      <section className="cart-overlay">
        <div className="cart-container">
          <div className="cart-header">
            <Button
              label={<IoIosArrowBack color="#fff" size={24} />}
              onClick={() => setIsOpenCart(false)}
              type="shortIcon"
              disabled={false}
            />
            <span>{switchStore ? "Sacola" : "Carrinho"}</span>
          </div>

          <div>
            {cartData !== null ? null : <h4>Seu carrinho está vazio!</h4>}

            {cartData !== null
              ? cartData.map((i) => (
                  <div className="cart-item" key={i.id}>
                    <img src={i.img} alt={i.name} />
                    <div className="cart-i-info">
                      <h3>{i.name.slice(0, 20)}</h3>
                      <div>
                        {i.types.map((type) => (
                          <span key={type.type.name}>{type.type.name}</span>
                        ))}
                      </div>
                      <div className="cart-item-btns">
                        <button onClick={() => decrement(i)}>
                          <GoDash size={20} color="#FFF" />
                        </button>

                        <button onClick={() => increment(i)}>
                          <GoPlus size={20} color="#FFF" />
                        </button>
                        <button onClick={() => removeFromCart(i)}>
                          <IoIosClose size={30} color="#FFF" />
                        </button>
                      </div>
                      <span>
                        {i.count} x R${i.price}
                      </span>
                    </div>
                  </div>
                ))
              : null}
          </div>

          {cartData === null ? null : (
            <>
              <div className="cart-item-price">
                <span>Total:</span> <h3>R${totalPrice || 0}</h3>
              </div>
              <Button
                label="Finalizar"
                onClick={() => {
                  setIsOpenCart(false);
                  setModalBuy(true);
                }}
                type="primmary"
              />
            </>
          )}
        </div>
      </section>
    );
  }
  return null;
};

export default Cart;
