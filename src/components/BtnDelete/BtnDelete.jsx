import css from './BtnDelete.module.css';

const BtnDelete = ({ isLoading, handleDelete }) => {
  return (
    <button
      type="button"
      onClick={() => handleDelete()}
      className={css.btnDelete}
      disabled={isLoading}
    >
      Delete
    </button>
  );
};

export default BtnDelete;
