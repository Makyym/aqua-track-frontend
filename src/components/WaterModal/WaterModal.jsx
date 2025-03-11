import WaterForm from '../WaterForm/WaterForm.jsx';

const WaterModal = ({ add, edit }) => {
  return (
    <div>
      <h2>Add water</h2>
      <h2>Edit the entered amount of water</h2>
      <h3>Choose value:</h3>
      <h3>Correct entered data:</h3>
      <WaterForm />
    </div>
  );
};

export default WaterModal;
