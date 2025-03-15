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

  const gender = watch('gender');
  const weight = watch('weight');
  const time = watch('time');
  const recommendedWaterNorm = calculateWaterNorm({ weight, time, gender });

  return (
    <div className={css.formDiv}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.inputRadioDiv}>
          <p className={clsx(css.boldText, css.indentity)}>
            Your gender identity
          </p>

          <div className={css.inputRadioDivContainer}>
            <label className={css.labelRadio}>
              <input
                type="radio"
                className={css.radioBtn}
                {...register('gender')}
                value="female"
              />
              <span className={clsx(css.allText, css.radioCustom)}>Female</span>
            </label>

            <label className={css.labelRadio}>
              <input
                type="radio"
                className={css.radioBtn}
                {...register('gender')}
                value="male"
              />
              <span className={css.allText}>Male</span>
            </label>
          </div>
        </div>

        <div className={css.divNameEmail}>
          <label className={css.labelNameEmail}>
            <span className={clsx(css.boldText, css.titleName)}>Your name</span>
            <input
              type="text"
              {...register('name')}
              className={css.inputNameEmail}
            />
            <span className={css.allText}> {errors.name?.message}</span>
          </label>
          <label className={css.labelNameEmail}>
            <span className={clsx(css.boldText, css.titleName)}>Email</span>
            <input
              type="text"
              {...register('email')}
              className={css.inputNameEmail}
            />
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

        <div className={css.divWeight}>
          <label>
            <span className={clsx(css.allText, css.labelYourWeight)}>
              Your weight in kilograms:
            </span>
            <input
              type="text"
              {...register('weight')}
              className={css.inputNameEmail}
            />
            <span> {errors.weight?.message}</span>
          </label>
          <label>
            <span className={css.allText}>
              The time of active participation in sports:
            </span>

            <input
              type="text"
              {...register('time')}
              className={css.inputNameEmail}
            />
            <span> {errors.time?.message}</span>
          </label>
        </div>

        <div className={css.requiredAmount}>
          <p className={css.allText}>
            The required amount of water in liters per day:
          </p>
          <span className={clsx(css.recomendedWater, css.formula)}>
            {recommendedWaterNorm}L
          </span>
        </div>

        <label htmlFor="">
          <span className={css.boldText}>
            Write down how much water you will drink:
          </span>
          <input
            type="text"
            {...register('water')}
            className={css.inputNameEmail}
          />
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
