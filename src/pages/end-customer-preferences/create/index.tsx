import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEndCustomerPreference } from 'apiSdk/end-customer-preferences';
import { Error } from 'components/error';
import { endCustomerPreferenceValidationSchema } from 'validationSchema/end-customer-preferences';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { PerfumeInterface } from 'interfaces/perfume';
import { getUsers } from 'apiSdk/users';
import { getPerfumes } from 'apiSdk/perfumes';
import { EndCustomerPreferenceInterface } from 'interfaces/end-customer-preference';

function EndCustomerPreferenceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EndCustomerPreferenceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEndCustomerPreference(values);
      resetForm();
      router.push('/end-customer-preferences');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EndCustomerPreferenceInterface>({
    initialValues: {
      preference_data: '',
      end_customer_id: (router.query.end_customer_id as string) ?? null,
      perfume_id: (router.query.perfume_id as string) ?? null,
    },
    validationSchema: endCustomerPreferenceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create End Customer Preference
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="preference_data" mb="4" isInvalid={!!formik.errors?.preference_data}>
            <FormLabel>Preference Data</FormLabel>
            <Input
              type="text"
              name="preference_data"
              value={formik.values?.preference_data}
              onChange={formik.handleChange}
            />
            {formik.errors.preference_data && <FormErrorMessage>{formik.errors?.preference_data}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'end_customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<PerfumeInterface>
            formik={formik}
            name={'perfume_id'}
            label={'Select Perfume'}
            placeholder={'Select Perfume'}
            fetcher={getPerfumes}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'end_customer_preference',
  operation: AccessOperationEnum.CREATE,
})(EndCustomerPreferenceCreatePage);
