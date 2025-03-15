import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './UserSettingsForm.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import newSprite from '../../assets/newSprite.svg';
import { selectUser } from '../../redux/auth/selectors';

const FILE_SIZE = 1024 * 1024 * 5;

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const schema = yup
  .object({
    gender: yup.string().oneOf(['female', 'male']).required(),
    name: yup.string().min(2).max(20).required(),
    email: yup.string().email().required(),
    avatarUrl: yup
      .mixed()
      // .test('required', 'File is required', value => value?.length > 0 || )
      .test('fileSize', 'File size too large', value =>
        value && value[0] ? value[0].size <= FILE_SIZE : true,
      )
      .test('fileFormat', 'Unsupported format', value =>
        value && value[0] ? SUPPORTED_FORMATS.includes(value[0].type) : true,
      ),
    weight: yup.number().positive().required(),
    dailySportTime: yup.number().positive().required(),
    dailyNorm: yup.number().positive().required(),
  })
  .required();

const calculateWaterNorm = ({ weight, time, gender }) => {
  const W = parseFloat(weight) || 0;
  const T = parseFloat(time) || 0;
  const V = gender === 'female' ? W * 0.03 + T * 0.4 : W * 0.04 + T * 0.6;
  return V.toFixed(1);
};

const UserSettingsForm = ({ onSuccessSubmit }) => {
  const [photo, setPhoto] = useState('https://i.pravatar.cc/80');
  const user = useSelector(selectUser);
  const { name, email, gender, dailySportTime, weight, dailyNorm, avatarUrl } =
    user;
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      name,
      email,
      gender,
      dailySportTime,
      weight,
      dailyNorm,
      avatarUrl,
    },
  });

  const onSubmit = async data => {
    console.log(data);

    try {
      await dispatch(updateUserSettings(data)).unwrap();
      const formData = { ...data, avatarUrl: photo };

      console.log(formData);
      reset();
      onSuccessSubmit();
    } catch (error) {
      console.log(error.message);
    }
  };
  const nameUpdate = watch('name');
  const genderUpdate = watch('gender');
  const weightUpdate = watch('weight');
  const dailySportTimeUpdate = watch('dailySportTime');
  const emailUpdate = watch('email');
  const uploadedFiles = watch('avatarUrl');

  const recommendedWaterNorm = calculateWaterNorm({
    weight,
    time: dailySportTime,
    gender,
  });
  const readerFile = file => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      setPhoto(event.target.result);
    };
  };
  readerFile(uploadedFiles && uploadedFiles[0]);
  return (
    <div className={css.formDiv}>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.avatarUploadDiv}>
          <img className={css.avatar} src={photo} alt="avatar" />
          <label className={css.labelUpload}>
            <svg className={css.upload}>
              <use href={`${newSprite}#icon-upload`} />
            </svg>
            <input
              type="file"
              className={clsx(css.uploadPhoto, 'srOnly')}
              {...register('avatarUrl')}
            />
            Upload a photo
          </label>
        </div>
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
              {...register('dailySportTime')}
              className={css.inputNameEmail}
            />
            <span> {errors.dailySportTime?.message}</span>
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
            {...register('dailyNorm')}
            className={css.inputNameEmail}
          />
          <span> {errors.dailyNorm?.message}</span>
        </label>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserSettingsForm;
