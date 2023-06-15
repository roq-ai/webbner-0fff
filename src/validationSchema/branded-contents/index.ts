import * as yup from 'yup';

export const brandedContentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  image: yup.string(),
  marketing_manager_id: yup.string().nullable().required(),
  perfume_id: yup.string().nullable().required(),
});
