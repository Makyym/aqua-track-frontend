import React, { useState } from "react";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterModal from "../WaterModal/WaterModal";
import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationType, setOperationType] = useState("add");
  const dailyNorm = 1.5;
  const consumed = 0.8;

  const openModal = (type) => {
    if (!isModalOpen) {
      setOperationType(type);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={css.sectionWrapper}>
      <div className={css.wrapper}>
        <h2 className={css.logo}>AQUATRACK</h2>
        <WaterDailyNorma dailyNorm={dailyNorm} />
        <WaterProgressBar consumed={consumed} dailyNorm={dailyNorm} />
        <AddWaterBtn onClick={() => openModal("add")} />

        <WaterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          operationType={operationType}
        />
      </div>
    </section>
  );
};

export default WaterMainInfo;