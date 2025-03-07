import css from './UserBarPopover.module.css';

const UserBarPopover = () => {
  return (
    <div className={css.vidget}>
      <button type="button" className={css.btnSettings}>
        Settings
      </button>
      <button type="button" className={css.btnLogOut}>
        LogOut
      </button>
    </div>
  );
};

export default UserBarPopover;
