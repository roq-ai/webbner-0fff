import * as yup from 'yup';

export const perfumeValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  designer_id: yup.string().nullable().required(),
});
