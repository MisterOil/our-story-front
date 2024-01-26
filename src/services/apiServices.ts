import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}/`);
    return response.data.stories;
  } catch (error) {
    throw error;
  }
};

export const saveStory = async (endpoint: string, formData: any ) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endpoint}/`, JSON.parse(JSON.stringify(formData)), {
      headers: {
            'Content-Type': 'application/json',
          },
    });
    return response.data.stoy;
  } catch (error) {
    throw error;
  }
};

export const updateStory = async (endpoint: string, formData: any ) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endpoint}/`, JSON.parse(JSON.stringify(formData)), {
      headers: {
            'Content-Type': 'application/json',
          },
    });
    return response.data.stoy;
  } catch (error) {
    throw error;
  }
};