import React from "react";
import { IoIosClose } from "react-icons/io";
import Button from "../Button";
const ModalBuy = ({ modalBuy, setModalBuy, totalPrice, onPress }) => {
  if (modalBuy === true) {
    return (
      <div className="modal-buy-overlay">
        <div className="modal-buy-content">
          <span className="modal-buy-btn">
            <Button
              label={<IoIosClose color="#fff" size={24} />}
              onClick={() => {
                setModalBuy(false);
                onPress();
              }}
              type="shortIcon"
              disabled={false}
            />
          </span>

          <h1>Uhull!</h1>
          <span>Você ganhou R${totalPrice} de volta</span>
        </div>
      </div>
    );
  }

  return null;
};

export default ModalBuy;
