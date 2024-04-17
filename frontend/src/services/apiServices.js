import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/products`
  );
  return response.data;
};


export const createPaymentIntent = async (amount) => {
  const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payments`, { amount });
  return response.data.clientSecret;
};

