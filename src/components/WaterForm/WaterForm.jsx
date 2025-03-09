import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

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

const WaterForm = () => {
  const {
    register,
    watch,
    handleSubmit,
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          placeholder={waterValue}
        />
        {errors.value && <p>{errors.value.message}</p>}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WaterForm;
