import axios from 'axios';
import queryString from 'query-string';
import { PerfumeInterface, PerfumeGetQueryInterface } from 'interfaces/perfume';
import { GetQueryInterface } from '../../interfaces';

export const getPerfumes = async (query?: PerfumeGetQueryInterface) => {
  const response = await axios.get(`/api/perfumes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPerfume = async (perfume: PerfumeInterface) => {
  const response = await axios.post('/api/perfumes', perfume);
  return response.data;
};

export const updatePerfumeById = async (id: string, perfume: PerfumeInterface) => {
  const response = await axios.put(`/api/perfumes/${id}`, perfume);
  return response.data;
};

export const getPerfumeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/perfumes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePerfumeById = async (id: string) => {
  const response = await axios.delete(`/api/perfumes/${id}`);
  return response.data;
};
