import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './UserSettingsForm.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import newSprite from '../../assets/newSprite.svg';
import { selectUser } from '../../redux/auth/selectors';
import { patchUser } from '../../redux/auth/operations.js';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const schema = yup.object({
  gender: yup.string().oneOf(['woman', 'man']).notRequired(),
  name: yup
  .string()
  .transform(value => (value === '' ? undefined : value))
  .min(3, 'Too short!')
  .max(50, 'Too long!')
  .notRequired(),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  weight: yup
    .number()
    .min(0, 'Weight must be at least 0')
    .typeError('Weight must be a number')
    .nullable()
    .notRequired(),
  dailySportTime: yup
    .number()
    .min(0, 'Time must be at least 0')
    .max(24, 'Are you a human?')
    .typeError('Time must be a number')
    .nullable()
    .notRequired(),
  dailyNorm: yup
    .number()
    .positive('Norm must be positive')
    .typeError('Norm must be a number')
    .nullable()
    .notRequired(),
    avatarUrl: yup
  .mixed()
  .notRequired()
  .test('fileFormat', 'Unsupported Format', (value) => {
    if (!value || !value[0]) {
      return true;
    }
    return SUPPORTED_FORMATS.includes(value[0].type);
  }),
}).required();

const calculateWaterNorm = ({ weight, time, gender }) => {
  const W = parseFloat(weight) || 0;
  const T = parseFloat(time) || 0;
  const V = gender === 'woman' ? W * 0.03 + T * 0.4 : W * 0.04 + T * 0.6;
  return V.toFixed(1);
};

const UserSettingsForm = ({ onSuccessSubmit }) => {
  const user = useSelector(selectUser);
  const { name, email, gender, dailySportTime, weight, dailyNorm, avatarUrl } = user;
  const defaultDailyNormInLiters = user.dailyNorm
    ? user.dailyNorm / 1000
    : 0;
  const [preview, setPreview] = useState(avatarUrl);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name,
      email,
      gender,
      dailySportTime,
      weight,
      dailyNorm: defaultDailyNormInLiters,
      avatarUrl,
    },
  });

  const watchedWeight = watch('weight');
  const watchedDailySportTime = watch('dailySportTime');
  const watchedGender = watch('gender');

  const onSubmit = (values) => {
    const formData = new FormData();
    if (values.avatarUrl && values.avatarUrl.length > 0) {
      formData.append('photo', values.avatarUrl[0]);
    }
    if (values.name && values.name !== "") {
      formData.append('name', values.name);
    }
    formData.append('email', values.email);
    formData.append('gender', values.gender);
    formData.append('dailySportTime', values.dailySportTime);
    formData.append('weight', values.weight);
    formData.append('dailyNorm', values.dailyNorm ? Number(values.dailyNorm) * 1000 : 0);
    dispatch(patchUser(formData));
    reset();
    onSuccessSubmit();
  };

  const recommendedWaterNorm = calculateWaterNorm({
    weight: watchedWeight !== undefined ? watchedWeight : weight,
    time: watchedDailySportTime !== undefined ? watchedDailySportTime : dailySportTime,
    gender: watchedGender !== undefined ? watchedGender : gender,
  });

  const watchedFiles = watch('avatarUrl');
  useEffect(() => {
    if (
      watchedFiles &&
      ((watchedFiles instanceof FileList && watchedFiles.length > 0) ||
        (Array.isArray(watchedFiles) && watchedFiles.length > 0))
    ) {
      const file = watchedFiles[0];
      if (file instanceof File) {
        const previewURL = URL.createObjectURL(file);
        setPreview(previewURL);
        return () => URL.revokeObjectURL(previewURL);
      }
    }
  }, [watchedFiles]);
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.avatarUploadDiv}>
          <img className={css.avatar} src={preview} alt="avatar" />
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
        <div className={css.wrapper}>
          <div className={css.inputRadioDiv}>
            <p>Your gender identity</p>
            <div className={css.inputRadioDivContainer}>
              <label className={css.labelRadio}>
                <input
                  type="radio"
                  className={css.radioBtn}
                  {...register('gender')}
                  value="woman"
                />
                <span className={css.radioCustom}>Woman</span>
              </label>
  
              <label className={css.labelRadio}>
                <input
                  type="radio"
                  className={css.radioBtn}
                  {...register('gender')}
                  value="man"
                />
                <span className={css.radioCustom}>Man</span>
              </label>
            </div>
          </div>
              <div className={css.divNameEmail}>
                <label className={css.labelNameEmail}>
                    Your name
                  <input
                    type="text"
                    {...register('name')}
                    className={clsx(css.inputNameEmail, { [css.inputInvalid]: Boolean(errors.name) })}
                  />
                  <span className={css.errorMessage}>{errors.name?.message}</span>
                </label>
                <label className={css.labelNameEmail}>
                  Email
                  <input
                    type="text"
                    {...register('email')}
                    className={`${css.inputNameEmail} ${errors.email ? css.inputInvalid : ''}`}
                  />
                  <span className={css.errorMessage}>{errors.email?.message}</span>
                </label>
              </div>
  
              <div className={css.divDailyNorma}>
                <p className={css.dailyNorma}>My daily norma</p>

                <div className={css.dailyNormDiv}>
                  <div className={css.formulaDiv}>
                    <p>For women:</p>
                    <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>
                  </div>
                  <div className={css.formulaDiv}>
                    <p>For men:</p>
                    <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
                  </div>
                </div>

                <p className={css.paragraph}>
                  <span className={css.formula}>*</span> V is the volume of the
                  water norm in liters per day, M is your body weight, T is the
                  time of active sports, or another type of activity commensurate
                  in terms of loads (in the absence of these, you must set 0)
                </p>

                <div className={css.activeDiv}>
                    <svg className={css.sign}>
                      <use href={`${newSprite}#icon-exclamation-mark`} />
                    </svg>
                  <p>Active time in hours</p>
                </div>
              </div>
              <div className={css.divWeight}>
                <label>
                    Your weight in kilograms:
                  <input
                    type="text"
                    {...register('weight')}
                    className={clsx(css.inputNameEmail, { [css.inputInvalid]: errors.weight })}
                  />
                  <span className={css.errorMessage}>{errors.weight?.message}</span>
                </label>
                <label>
                    The time of active participation in sports:
                  <input
                    type="text"
                    {...register('dailySportTime')}
                    className={clsx(css.inputNameEmail, { [css.inputInvalid]: errors.dailySportTime })}
                  />
                  <span className={css.errorMessage}>{errors.dailySportTime?.message}</span>
                </label>
              </div>
  
              <div className={css.requiredAmount}>
                <div className={css.requiredDiv}>
                  <p>The required amount of water in liters per day:</p>
                  <span className={`${css.formula} ${css.formulaText}`}>
                    {recommendedWaterNorm} L
                  </span>
                </div>
              <label>
                  Write down how much water you will drink:
                <input
                  type="text"
                  {...register('dailyNorm')}
                  className={clsx(css.inputNameEmail, { [css.inputInvalid]: errors.dailyNorm })}
                />
                <span className={css.errorMessage}>{errors.dailyNorm?.message}</span>
              </label>
              </div>
        </div>
        <button type="submit" className={css.saveBtn}>
          Save
        </button>
      </form>
    </div>
  );
};

export default UserSettingsForm;