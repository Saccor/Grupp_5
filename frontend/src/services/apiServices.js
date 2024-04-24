// import axios from "axios";

// export const fetchProducts = async () => {
//   const response = await axios.get(
//     ${process.env.REACT_APP_BACKEND_URL}/api/multi-collection-products
//   );
//   return response.data;
// };

import axios from "axios";

export const fetchProducts = async () => {
  const response = await axios.get("http://localhost:3001/api/multi-collection-products");
  return response.data;
};