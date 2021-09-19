import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import InputIcon from "../Input";

const Header = ({
  isOpenCart,
  setIsOpenCart,
  switchStore,
  setSwitchStore,
  searchPokemon,
  setSearchPokemon,
  setCartData,
  setTotalPrice,
}) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button
            onClick={() => {
              localStorage.clear();
              setCartData(null);
              setTotalPrice(0);
              setSwitchStore(!switchStore);
            }}
            className="header-logo"
          >
            <span>{switchStore ? "WaterShop." : "FireShop."}</span>
          </button>
          <span className="container-input">
            <InputIcon
              value={searchPokemon}
              setValue={setSearchPokemon}
              placeholder={switchStore ? "Pesquisa aqui" : "Procurar Pokémon "}
            />
          </span>
        </div>
        <ul className="header-right">
          <li>
            <button type="button" onClick={() => setIsOpenCart(!isOpenCart)}>
              {switchStore ? (
                <FiShoppingBag size={35} color="#fff" />
              ) : (
                <AiOutlineShoppingCart size={35} color="#fff" />
              )}
            </button>
          </li>
        </ul>
      </div>
      <span className="container-input-out">
        <InputIcon
          value={searchPokemon}
          setValue={setSearchPokemon}
          placeholder={switchStore ? "Pesquisa aqui" : "Procurar Pokémon "}
        />
      </span>
    </header>
  );
};

export default Header;
