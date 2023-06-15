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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getEndCustomerPreferenceById, updateEndCustomerPreferenceById } from 'apiSdk/end-customer-preferences';
import { Error } from 'components/error';
import { endCustomerPreferenceValidationSchema } from 'validationSchema/end-customer-preferences';
import { EndCustomerPreferenceInterface } from 'interfaces/end-customer-preference';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { PerfumeInterface } from 'interfaces/perfume';
import { getUsers } from 'apiSdk/users';
import { getPerfumes } from 'apiSdk/perfumes';

function EndCustomerPreferenceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EndCustomerPreferenceInterface>(
    () => (id ? `/end-customer-preferences/${id}` : null),
    () => getEndCustomerPreferenceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EndCustomerPreferenceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateEndCustomerPreferenceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/end-customer-preferences');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<EndCustomerPreferenceInterface>({
    initialValues: data,
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
            Edit End Customer Preference
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'end_customer_preference',
  operation: AccessOperationEnum.UPDATE,
})(EndCustomerPreferenceEditPage);
