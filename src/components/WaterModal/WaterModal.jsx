import WaterForm from '../WaterForm/WaterForm.jsx';

const WaterModal = ({ addWaterEntry, editWaterEntry }) => {
  return (
    <div>
      <h2 className="title">Add water</h2>
      <button type="button" onClick={close}>
        svg
      </button>
      <h2 className="title">Edit the entered amount of water</h2>
      <h3>Choose value:</h3>
      <h3>Correct entered data:</h3>
      <WaterForm />
    </div>
  );
};

export default WaterModal;
