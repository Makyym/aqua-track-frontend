import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import s from "./AddWaterBtn.module.css";
import sprite from "../../assets/newSprite.svg";

const AddWaterBtn = ({ daily }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={daily ? s.button : s.buttonDaily}
        onClick={handleOpenModal}
      >
        <svg className={daily ? s.icon : s.iconDaily} width="16" height="16">
          <use href={`${sprite}#icon-plus`} />
        </svg>
        <p className={s.add_water}>Add water</p>
      </button>

      {isModalOpen && <WaterModal onClose={handleCloseModal} />}
    </>
  );
};

export default AddWaterBtn;
