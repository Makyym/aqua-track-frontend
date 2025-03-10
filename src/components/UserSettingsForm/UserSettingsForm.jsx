import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './UserSettingsForm.module.css';
import clsx from 'clsx';
const schema = yup
  .object({
    gender: yup.string().oneOf(['female', 'male']).required(),
    name: yup.string().min(2).max(20).required(),
    email: yup.string().email().required(),
    weight: yup.number().positive().required(),
    time: yup.number().positive().required(),
    water: yup.number().positive().required(),
  })
  .required();

const calculateWaterNorm = ({ weight, time, gender }) => {
  const W = parseFloat(weight) || 0;
  const T = parseFloat(time) || 0;
  const V = gender === 'female' ? W * 0.03 + T * 0.4 : W * 0.04 + T * 0.6;
  return V.toFixed(1);
};

const UserSettingsForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      gender: 'female',
      time: 0,
      weight: 0,
      water: 0,
    },
  });

  const onSubmit = data => console.log(data);
  console.log(watch('gender'));
  const gender = watch('gender');
  const weight = watch('weight');
  const time = watch('time');
  const recommendedWaterNorm = calculateWaterNorm({ weight, time, gender });

  return (
    <div className={css.formDiv}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.inputRadio}>
          <p className={css.boldText}>Your gender identity</p>
          <label htmlFor="">
            <span className={css.allText}>Female</span>
            <input
              type="radio"
              className={css.radioBtn}
              {...register('gender')}
              value="female"
            />
          </label>
          <label htmlFor="">
            <span className={css.allText}>Male</span>
            <input
              type="radio"
              className={css.radioBtn}
              {...register('gender')}
              value="male"
            />
          </label>
        </div>
        <div className={css.divNameEmail}>
          <label className={css.labelNameEmail}>
            <span className={clsx(css.boldText, css.titleName)}>Your name</span>
            <input type="text" {...register('name')} />
            <span className={css.allText}> {errors.name?.message}</span>
          </label>
          <label className={css.labelNameEmail}>
            <span className={clsx(css.boldText, css.titleName)}>Email</span>
            <input type="text" {...register('email')} />
            <span> {errors.email?.message}</span>
          </label>
        </div>

        <div className={css.divDailyNorma}>
          <p className={clsx(css.boldText, css.dailyNorma)}>My daily norma</p>
          <p className={clsx(css.allText, css.WMFormula)}>For women:</p>
          <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>

          <p className={clsx(css.allText, css.WMFormula)}>For men:</p>
          <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
          <p className={clsx(css.allText, css.paragraph)}>
            <span className={css.formula}>*</span> V is the volume of the water
            norm in liters per day, M is your body weight, T is the time of
            active sports, or another type of activity commensurate in terms of
            loads (in the absence of these, you must set 0)
          </p>
        </div>

        <p className={clsx(css.allText, css.activeP)}>
          <span className={clsx(css.formula, css.activSign)}>!</span>Active time
          in hours
        </p>

        <label htmlFor="">
          <span className={css.allText}>Your weight in kilograms:</span>
          <input type="text" {...register('weight')} />
          <span> {errors.weight?.message}</span>
        </label>
        <label htmlFor="">
          <span className={css.allText}>
            The time of active participation in sports:
          </span>
          <input type="text" {...register('time')} />
          <span> {errors.time?.message}</span>
        </label>
        <div>
          <p className={css.allText}>
            The required amount of water in liters per day:
          </p>
          <span>{recommendedWaterNorm}L</span>
        </div>
        <label htmlFor="">
          <span className={css.boldText}>
            Write down how much water you will drink:
          </span>
          <input type="text" {...register('water')} />
          <span> {errors.water?.message}</span>
        </label>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserSettingsForm;
