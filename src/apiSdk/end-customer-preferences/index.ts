import axios from 'axios';
import queryString from 'query-string';
import {
  EndCustomerPreferenceInterface,
  EndCustomerPreferenceGetQueryInterface,
} from 'interfaces/end-customer-preference';
import { GetQueryInterface } from '../../interfaces';

export const getEndCustomerPreferences = async (query?: EndCustomerPreferenceGetQueryInterface) => {
  const response = await axios.get(`/api/end-customer-preferences${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEndCustomerPreference = async (endCustomerPreference: EndCustomerPreferenceInterface) => {
  const response = await axios.post('/api/end-customer-preferences', endCustomerPreference);
  return response.data;
};

export const updateEndCustomerPreferenceById = async (
  id: string,
  endCustomerPreference: EndCustomerPreferenceInterface,
) => {
  const response = await axios.put(`/api/end-customer-preferences/${id}`, endCustomerPreference);
  return response.data;
};

export const getEndCustomerPreferenceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/end-customer-preferences/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteEndCustomerPreferenceById = async (id: string) => {
  const response = await axios.delete(`/api/end-customer-preferences/${id}`);
  return response.data;
};
