import routes from '@router/index';
import axios from 'axios';

export async function getOptions() {
  try {
    const response = await axios.get(routes.options);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching options: ${error}`);
  }
}

export async function generateNote(formData: any) {
  try {
    const response = await axios.post(routes.generateNote, formData);
    return response.data.note;
  } catch (error) {
    throw new Error(`Error generating note: ${error}`);
  }
}
