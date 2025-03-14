import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import css from './WaterForm.module.css';

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

const WaterForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddWaterSchema),
    defaultValues: {
      time: currentTime,
      value: 50,
    },
  });

  // const onSubmit = async data => {
  //   try {
  //     dispatch(addWater(data));
  //   } catch (error) {
  //     alert('Failed to add water');
  //   }
  // };

  const timeValue = watch('time') || currentTime;
  const waterValue = watch('value') || 50;

  const handlePlusClick = () =>
    setValue('value', Math.min(Number(waterValue) + step, 5000));
  const handleMinusClick = () =>
    setValue('value', Math.max(Number(waterValue) - step, 50));

  return (
    <div className={css.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <lable className={css.waterAndTimeLable}>Amount of water:</lable>
        <div className={css.plusMinusContainer}>
          <button
            className={css.plusMinusBtn}
            type="button"
            onClick={handleMinusClick}
          >
            -
          </button>
          <span className={css.waterAmount}>{waterValue}</span>

          <button
            className={css.plusMinusBtn}
            type="button"
            onClick={handlePlusClick}
          >
            +
          </button>
        </div>
        <label className={css.waterAndTimeLable} htmlFor="time">
          Recording time:
        </label>
        <input
          className={css.input}
          id="time"
          type="text"
          {...register('time')}
        />
        {errors.time && <p>{errors.time.message}</p>}
        <label className={css.waterValueLable} htmlFor="value">
          Enter the value of the water used:
        </label>
        <input
          className={css.input}
          id="value"
          type="number"
          {...register('value')}
        />
        {errors.value && <p>{errors.value.message}</p>}
        <button className={css.btn} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default WaterForm;
