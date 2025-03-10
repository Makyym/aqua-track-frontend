import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';

const AddWaterSchema = Yup.object({
  time: Yup.string()
    .required('Time is required')
    .matches(
      /^([0-9]|[01]\d|2[0-3]):([0-5]\d)$/,
      'Invalid time format (H:MM or HH:MM)',
    ),
  value: Yup.number()
    .min(10, 'Minimum value is 10ml')
    .max(5000, 'Maximum value is 5000ml')
    .required('Value is required'),
});

const step = 50;

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
      time: '',
      value: 50,
    },
  });

  const onSubmit = async data => {
    try {
      console.log(data);
    } catch (error) {}
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

  const timeValue = watch('time') || currentTime;
  const waterValue = watch('value') || 50;

  const handlePlusClick = () => {
    const newValue = waterValue + step;
    setValue('value', newValue);
  };
  const handleMinusClick = () => {};

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Add water</h2>
        <h3>Choose value:</h3>

        <lable>Amount of water:</lable>
        <div>
          <button type="button" onClick={handleMinusClick}>
            {' '}
            -{' '}
          </button>
          <span>{waterValue}</span>

          <button type="button" onClick={handlePlusClick}>
            {' '}
            +{' '}
          </button>
        </div>

        <label htmlFor="time">Recording time:</label>
        <input
          id="time"
          type="text"
          {...register('time')}
          placeholder={timeValue}
        />
        {errors.time && <p>{errors.time.message}</p>}

        <label htmlFor="value">Enter the value of the water used:</label>
        <input
          id="value"
          type="number"
          {...register('value')}
          value={waterValue}
          // value={newValue}
        />
        {errors.value && <p>{errors.value.message}</p>}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WaterForm;
