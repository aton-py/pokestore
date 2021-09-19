import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Button from "../Button";
import getRandomInteger from "../../utils/getRandomInteger";

const Card = ({ data, addCart }) => {
  const url = data;
  const [pokemon, setPokemon] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    api
      .get(`pokemon/${url.substring(34)}`, {
        headers: {
          "Access-Control-Allow-Origin": "https://pokestore-rho.vercel.app/",
        },
      })
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.log(error));
    setPrice(getRandomInteger(1000, 2000));
  }, [url]);

  function handleClick() {
    let data = {
      id: pokemon.id,
      count: 1,
      name: pokemon.name,
      types: pokemon.types,
      img: pokemon.sprites.other["official-artwork"].front_default,
      price: price,
    };
    addCart(data);
  }

  return (
    <>
      {pokemon === null ? null : (
        <div className="card">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt=""
            className="card-image"
          />
          <div className="card-info">
            <h2>{pokemon.name}</h2>
            <div className="types">
              {pokemon.types.map((type) => (
                <span key={type.type.name}>{type.type.name}</span>
              ))}
            </div>

            <h3>R${price}</h3>
          </div>
          <div className="card-overlay">
            <Button
              label="Adicionar ao carrinho"
              onClick={handleClick}
              type="primmary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
