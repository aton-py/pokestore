import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Card from "../../components/Card/index";
import Button from "../../components/Button";
import { IoIosClose } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { GoPlus, GoDash } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ModalBuy from "../../components/ModalBuy";

const Home = ({
  cartData,
  setCartData,
  totalPrice,
  setTotalPrice,
  switchStore,
  searchPokemon,
  modalBuy,
  setModalBuy,
}) => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage || 10;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentDat = currentData.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(data.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (switchStore !== true) {
      api
        .get(`type/10`)
        .then((response) => {
          setCurrentPage(response.data.pokemon);
          setData(response.data.pokemon);
        })
        .catch((error) => console.log(error));
    } else {
      api
        .get(`type/11`)
        .then((response) => {
          setData(response.data.pokemon);
          setCurrentPage(response.data.pokemon);
        })
        .catch((error) => console.log(error));
    }
  }, [switchStore]);

  useEffect(() => {
    const resultados = data.filter((item) =>
      item.pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );
    setCurrentData(resultados);
  }, [searchPokemon, data]);

  function addCart(newItem) {
    let array = cartData || [];
    let alreadyExists = false;

    array.forEach((item) => {
      if (item.id === newItem.id) {
        console.log(item);
        alreadyExists = true;
        item.count += 1;
        setCartData([...array]);
      }
    });

    if (!alreadyExists) {
      array.push({ ...newItem, count: 1 });
    }
    console.log(cartData);

    if (cartData !== null) {
      let total = cartData.reduce(
        (total, { price = 0, count }) => total + count * price,
        0
      );
      setTotalPrice(total);
      localStorage.setItem("totalPrice", JSON.stringify(total));
    } else {
      setTotalPrice(newItem.price);
      localStorage.setItem("totalPrice", JSON.stringify(newItem.price));
    }
    setCartData([...array]);

    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

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

  return (
    <>
      <ModalBuy
        modalBuy={modalBuy}
        setModalBuy={setModalBuy}
        totalPrice={totalPrice}
        onPress={() => {
          localStorage.clear();
          setCartData([]);
          setTotalPrice(0);
        }}
      />
      <main className="main">
        <div className="main-content">
          <section>
            <div className="cards">
              {currentDat === null
                ? null
                : currentDat.map((item) => (
                    <Card
                      key={item.pokemon.name}
                      data={item.pokemon.url}
                      addCart={addCart}
                    />
                  ))}
            </div>
            <div className="side-cart">
              <div className="side-cart-header">
                {switchStore ? (
                  <FiShoppingBag size={20} color="#0008c7" />
                ) : (
                  <AiOutlineShoppingCart size={20} color="#cd121f" />
                )}
                <h1>{switchStore ? "Sacola" : "Carrinho"}</h1>
              </div>
              {cartData !== null ? null : <h4>Seu carrinho está vazio!</h4>}
              {cartData !== null
                ? cartData.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.img} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name.slice(0, 20)}</h3>
                        <div>
                          {item.types.map((type) => (
                            <span key={type.type.name}>{type.type.name}</span>
                          ))}
                        </div>
                        <div className="cart-item-btns">
                          <button onClick={() => decrement(item)}>
                            <GoDash size={20} color="#FFF" />
                          </button>

                          <button onClick={() => increment(item)}>
                            <GoPlus size={20} color="#FFF" />
                          </button>
                          <button onClick={() => removeFromCart(item)}>
                            <IoIosClose size={30} color="#FFF" />
                          </button>
                        </div>
                        <span>
                          {item.count} x R${item.price}
                        </span>
                      </div>
                    </div>
                  ))
                : null}

              {cartData === null ? null : (
                <>
                  <div className="side-cart-price">
                    <span>Total:</span> <h3>R${totalPrice || 0}</h3>
                  </div>

                  <Button
                    label="Finalizar"
                    onClick={() => {
                      setModalBuy(true);
                    }}
                    type="primmary"
                  />
                </>
              )}
            </div>
          </section>

          <section className="main-buttons">
            {pageNumbers.map((number) => (
              <Button
                label={number}
                onClick={() => paginate(number)}
                type="shortIcon"
                key={number}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
