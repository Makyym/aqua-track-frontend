import AddWaterBtn from "../AddWaterBtn/AddWaterBtn.jsx"
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma.jsx"
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar.jsx"
import Logo from "../Logo/Logo"
import s from "./WaterMainInfo.module.css"


const WaterMainInfo = () => {
    return (
        <div className={s.div}>
            <Logo />
            <WaterDailyNorma />
            <WaterProgressBar />
            <AddWaterBtn />
        </div>
    )
}

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