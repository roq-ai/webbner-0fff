import axios from 'axios';
import queryString from 'query-string';
import { BrandedContentInterface, BrandedContentGetQueryInterface } from 'interfaces/branded-content';
import { GetQueryInterface } from '../../interfaces';

export const getBrandedContents = async (query?: BrandedContentGetQueryInterface) => {
  const response = await axios.get(`/api/branded-contents${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBrandedContent = async (brandedContent: BrandedContentInterface) => {
  const response = await axios.post('/api/branded-contents', brandedContent);
  return response.data;
};

export const updateBrandedContentById = async (id: string, brandedContent: BrandedContentInterface) => {
  const response = await axios.put(`/api/branded-contents/${id}`, brandedContent);
  return response.data;
};

export const getBrandedContentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/branded-contents/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBrandedContentById = async (id: string) => {
  const response = await axios.delete(`/api/branded-contents/${id}`);
  return response.data;
};
