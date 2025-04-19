import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addWaterEntry, editWaterEntry } from '../../redux/water/operations.js';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import css from './WaterForm.module.css';
import newSprite from '../../assets/newSprite.svg';

const AddWaterSchema = Yup.object({
  time: Yup.string()
    .required('Time is required')
    .matches(
      /^([0-9]|[01]\d|2[0-3]):([0-5]\d)$/,
      'Invalid time format (H:MM or HH:MM)',
    ),
  value: Yup.number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(50, 'Minimum value is 50ml')
    .max(5000, 'Maximum value is 5000ml')
    .required('Value is required'),
});

const step = 50;

const currentTime = new Date().toLocaleTimeString([], {
  hour: 'numeric',
  minute: '2-digit',
});

function formatTimeString (time) {
  const [hours, minutes] = time.split(':');
  const formattedHours = String(hours).padStart(2, '0');
  return `${formattedHours}:${minutes}`;
}

const WaterForm = ({ editValue, dateString, onClose, waterId }) => {
  const dispatch = useDispatch();
  const oldValue = editValue;
  const timeOnly = dateString.split("T")[1];
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(AddWaterSchema),
    defaultValues: {
      time: timeOnly ?? currentTime,
      value: editValue ?? 50,
    },
  });

  const onSubmit = values => {
    const time = formatTimeString(values.time);
    if (waterId) {
      const onlyDate = dateString.split('T')[0];
      const data = {
        id: waterId,
        value: values.value,
        date: `${onlyDate}T${time}`,
        oldValue,
      };
      dispatch(editWaterEntry(data));
      reset();
      onClose();
      return;
    }
    const data = {
      value: values.value,
      date: `${dateString}T${time}`,
    };
    dispatch(addWaterEntry(data));
    reset();
    onClose();
  };

  const waterValue = watch('value') ?? 50;

  const handlePlusClick = () => {
    const newValue = Math.min(Number(waterValue) + step, 5000);
    setValue('value', newValue);
  };

  const handleMinusClick = () => {
    const newValue = Math.max(Number(waterValue) - step, 50);
    setValue('value', newValue);
  };
  const displayWaterValue = Math.min(Number(waterValue), 5000);

  const handleValueChange = e => {
    const inputValue = e.target.value;
    if (inputValue === '') {
      setValue('value', '', { shouldValidate: true });
    } else {
      let numValue = Number(inputValue);
      // if (numValue > 5000) {
      //   numValue = 5000;
      // }
      setValue('value', numValue, { shouldValidate: true });
    }
  };

  return (
    <div className={css.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.waterAmountContainer}>
          <label className={css.waterAmountLabel}>
            Amount of water:
            <div className={css.plusMinusContainer}>
              <button
                className={css.plusMinusBtn}
                type="button"
                onClick={handleMinusClick}
              >
                <svg className={css.minusSvg} width={40} height={40}>
                  <use href={`${newSprite}#icon-minus`} />
                </svg>
              </button>
              <span className={css.waterAmount}>{displayWaterValue} ml</span>
              <button
                className={css.plusMinusBtn}
                type="button"
                onClick={handlePlusClick}
              >
                <svg className={css.plusSvg} width={40} height={40}>
                  <use href={`${newSprite}#icon-plus`} />
                </svg>
              </button>
            </div>
          </label>
        </div>
        <div className={css.timeContainer}>
          <label className={css.waterAmountLabel} htmlFor="time">
            Recording time:
            <input
              className={css.input}
              id="time"
              type="text"
              {...register('time')}
            />
          </label>
          {errors.time ? (
            <p className={css.errorMessage}>{errors.time.message}</p>
          ) : (
            <p className={`${css.errorMessage} ${css.hidden}`}> </p>
          )}
        </div>
        <div className={css.waterValueContainer}>
          <label className={css.waterValueLabel} htmlFor="value">
            Enter the value of the water used:
            <input
              className={css.input}
              id="value"
              type="number"
              {...register('value')}
              max="5000"
              value={waterValue}
              onChange={handleValueChange}
            />
          </label>
          {errors.value ? (
            <p className={css.errorMessage}>{errors.value.message}</p>
          ) : (
            <p className={`${css.errorMessage} ${css.hidden}`}> </p>
          )}
        </div>
        <button className={css.btn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default WaterForm;
