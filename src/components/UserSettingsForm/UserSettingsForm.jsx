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

// const FILE_SIZE = 1024 * 1024 * 5;

// const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const schema = yup
  .object({
    gender: yup.string().oneOf(['woman', 'man']).required(),
    name: yup.string().min(2).max(20).required(),
    email: yup.string().email().required(),
    // avatarUrl: yup
    //   .mixed()

    //   .test('fileSize', 'File size too large', value =>
    //     value && value[0] ? value[0].size <= FILE_SIZE : true,
    //   )
    //   .test('fileFormat', 'Unsupported format', value =>
    //     value && value[0] ? SUPPORTED_FORMATS.includes(value[0].type) : true,
    //   ),
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
  const user = useSelector(selectUser);
  const { name, email, gender, dailySportTime, weight, dailyNorm, avatarUrl } = user;
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

  const onSubmit = (values) => {
      const file = values.avatarUrl && values.avatarUrl[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('photo', file);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('gender', values.gender);
      formData.append('dailySportTime', values.dailySportTime);
      formData.append('weight', values.weight);
      formData.append('dailyNorm', values.dailyNorm);
      dispatch(patchUser(formData));
      reset();
      onSuccessSubmit();
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
                    className={css.inputNameEmail}
                  />
                  <span className={css.allText}> {errors.name?.message}</span>
                </label>
                <label className={css.labelNameEmail}>
                  Email
                  <input
                    type="text"
                    {...register('email')}
                    className={css.inputNameEmail}
                  />
                  <span> {errors.email?.message}</span>
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
                  {/* <span className={css.sign}>!</span> */}
                  <p>Active time in hours</p>
                </div>
              </div>
              <div className={css.divWeight}>
                <label>
                    Your weight in kilograms:
                  <input
                    type="text"
                    {...register('weight')}
                    className={css.inputNameEmail}
                  />
                  <span>{errors.weight?.message}</span>
                </label>
                <label>
                    The time of active participation in sports:
                  <input
                    type="text"
                    {...register('dailySportTime')}
                    className={css.inputNameEmail}
                  />
                  <span>{errors.dailySportTime?.message}</span>
                </label>
              </div>
  
              <div className={css.requiredAmount}>
                <div className={css.requiredDiv}>
                  <p>The required amount of water in liters per day:</p>
                  <span className={css.formula}>
                    {recommendedWaterNorm} L
                  </span>
                </div>
              <label>
                  Write down how much water you will drink:
                <input
                  type="text"
                  {...register('dailyNorm')}
                  className={css.inputNameEmail}
                />
                <span>{errors.dailyNorm?.message}</span>
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
