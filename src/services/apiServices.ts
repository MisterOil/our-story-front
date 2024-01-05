import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}`;

export const fetchData = async (endpoint: string) => {
  console.log(process.env.REACT_APP_API_URL)
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}/`);
    return response.data.stories;
  } catch (error) {
    throw error;
  }
};

export const saveStory = async (endpoint: string, formData: any ) => {
  console.log(formData)
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