import React, { memo } from "react";
import BaseModal from "../BaseModal/BaseModal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import css from "./WaterModal.module.css";

const WaterModal = memo(({ isOpen, onClose, operationType }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.modalContainer}>

        <h2 className={css.modalTitle}>
          {operationType === "add" ? "Add water" : "Edit the entered amount of water"}
        </h2>

        <WaterForm operationType={operationType} onClose={onClose} />
      </div>
    </BaseModal>
  );
});

export default WaterModal;
