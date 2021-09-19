import { AiOutlineSearch } from "react-icons/ai";
const InputIcon = ({ value, setValue, placeholder }) => {
  return (
    <div className="input-icon-container">
      <AiOutlineSearch size={20} color="#d0d0d1" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputIcon;
