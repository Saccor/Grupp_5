import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Layout>
      <h1>Product List</h1>
      <Link href={'/products/new'}>Add new product</Link>
      <table className="basic mt-2">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link href={`/products/edit/${product._id}`}>Edit</Link>
                {' | '}
                <Link href={`/products/delete/${product._id}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
