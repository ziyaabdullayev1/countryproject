import axios from 'axios';

const fetchCountries = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

export default fetchCountries;