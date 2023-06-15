import * as yup from 'yup';

export const endCustomerPreferenceValidationSchema = yup.object().shape({
  preference_data: yup.string().required(),
  end_customer_id: yup.string().nullable().required(),
  perfume_id: yup.string().nullable().required(),
});
