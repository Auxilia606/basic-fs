import axios from 'axios';

export const handleAxiosError = (error: unknown, log: string) => {
  if (axios.isAxiosError(error)) {
    console.error(log, error.response ? error.response.data : error.message);

    throw new Error(log);
  }
};
