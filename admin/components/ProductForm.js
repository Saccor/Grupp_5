import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from "@/components/Spinner";

export default function ProductForm({
  _id, name: existingName, description: existingDescription,
  price: existingPrice, image: existingImage, inStock: existingInStock
}) {
  const [name, setName] = useState(existingName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [image, setImage] = useState(existingImage || null);
  const [inStock, setInStock] = useState(existingInStock || false);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = { name, description, price, image, inStock };
    try {
      if (_id) {
        await axios.put('/api/products', { ...data, _id });
      } else {
        await axios.post('/api/products', data);
      }
      setGoToProducts(true);
    } catch (error) {
      alert('Failed to save product: ' + (error.message || 'Unknown error'));
    }
  };

  if (goToProducts) {
    router.push('/products');
  }

  const uploadImage = async (ev) => {
    const file = ev.target?.files[0];
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.append('file', file);
      try {
        const res = await axios.post('/api/upload', data);
        setImage(res.data.link);
      } catch (error) {
        alert('Failed to upload image: ' + (error.message || 'Unknown error'));
      }
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />
      <label>Image</label>
      {image && (
        <img src={image} alt="Product" style={{ width: '100px', height: '100px' }} />
      )}
      <input type="file" onChange={uploadImage} />
      {isUploading && <Spinner />}
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      />
      <label>In Stock</label>
      <input
        type="checkbox"
        checked={inStock}
        onChange={ev => setInStock(ev.target.checked)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
