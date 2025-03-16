import WaterModal from "../../components/WaterModal/WaterModal.jsx"; 
import WaterDailyNorma from "../../components/WaterDailyNorma/WaterDailyNorma.jsx"; 
import WaterProgressBar from "../../components/WaterProgressBar/WaterProgressBar.jsx"; 
import AddWaterBtn from "../../components/AddWaterBtn/AddWaterBtn.jsx"; 
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx"; 
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx"; 
import s from "./TrackerPage.module.css"; 

const TrackerPage = () => {
  return (
    <div className={s.div}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <WaterModal />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
};

export default TrackerPage;
