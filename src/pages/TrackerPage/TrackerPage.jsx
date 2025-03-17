import WaterModal from "../../components/WaterModal/WaterModal.jsx"; 
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo.jsx"; 
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo.jsx"; 
import s from "./TrackerPage.module.css"; 

const TrackerPage = () => {
  return (
    <div className={s.div}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <WaterModal />
    </div>
  );
};

export default TrackerPage;
