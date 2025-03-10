import { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import s from "./AddWaterBtn.module.css";
import icons from "../../images/sprite.svg";

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button type="button" className={s.button} onClick={handleOpenModal}>
        <svg className={s.plus} width="16" height="16">
          <use href={icons + "#icon-plus"} />
        </svg>
        <p className={s.add_water}>Add water</p>
      </button>

      {isModalOpen && <WaterModal onClose={handleCloseModal} />}
    </>
  );
};

export default AddWaterBtn;
