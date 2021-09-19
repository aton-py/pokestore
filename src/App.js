import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Routes from "./routes";

import "./global.scss";
import { FaStoreAlt } from "react-icons/fa";
import Button from "./components/Button";

function App() {
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [switchStore, setSwitchStore] = useState(false);
  const [modalBuy, setModalBuy] = useState(false);

  useEffect(() => {
    setCartData(JSON.parse(localStorage.getItem("cartData")));
    setTotalPrice(JSON.parse(localStorage.getItem("totalPrice")));
  }, []);

  return (
    <div className={switchStore ? `water` : null}>
      <Router>
        <Header
          isOpenCart={isOpenCart}
          setIsOpenCart={setIsOpenCart}
          switchStore={switchStore}
          setSwitchStore={setSwitchStore}
          searchPokemon={searchPokemon}
          setSearchPokemon={setSearchPokemon}
          setCartData={setCartData}
          setTotalPrice={setTotalPrice}
        />
        <Routes
          cartData={cartData}
          setCartData={setCartData}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          switchStore={switchStore}
          setSwitchStore={setSwitchStore}
          searchPokemon={searchPokemon}
          setSearchPokemon={setSearchPokemon}
          modalBuy={modalBuy}
          setModalBuy={setModalBuy}
        />
        <Cart
          isOpenCart={isOpenCart}
          setIsOpenCart={setIsOpenCart}
          cartData={cartData}
          setCartData={setCartData}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          switchStore={switchStore}
          setModalBuy={setModalBuy}
        />
        <Button
          label={<FaStoreAlt color="#fff" size={30} />}
          onClick={() => setSwitchStore(!switchStore)}
          type="floatingIcon"
        />
      </Router>
    </div>
  );
}

export default App;
