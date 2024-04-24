import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from "@/components/Spinner";

export default function ProductForm({
  _id, name: existingName, description: existingDescription,
  price: existingPrice, image: existingImage, inStock: existingInStock, category: existingCategory
}) {
  const [name, setName] = useState(existingName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [image, setImage] = useState(existingImage || '');
  const [inStock, setInStock] = useState(existingInStock || false);
  const [category, setCategory] = useState(existingCategory || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();



  const uploadImage = async (ev) => {
    const file = ev.target.files[0];
    if (file) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('/api/upload', formData);
            setImage(res.data.links[0]);  // Assuming 'links' is the correct response property
            console.log('Image uploaded successfully:', res.data.links[0]);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image: ' + (error.message || 'Unknown error'));
        }
        setIsUploading(false);
    }
};



  const saveProduct = async (ev) => {
    ev.preventDefault();
    const data = { name, description, price, image, inStock, category };
console.log(data);
    try {
      if (_id) {
        await axios.put('/api/products', { ...data, _id });
      } else {
        await axios.post('/api/products', data);
      }
      setGoToProducts(true);
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product: ' + (error.message || 'Unknown error'));
    }
  };




  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input type="text" placeholder="Product name" value={name} onChange={e => setName(e.target.value)} />
      <label>Image</label>
      {image && <img src={image} alt="Product" style={{ width: '100px', height: '100px' }} />}
      <input type="file" onChange={uploadImage} />
      {isUploading && <Spinner />}
      <label>Description</label>
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <label>Price (in Kr)</label>
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <label>In Stock</label>
      <input type="checkbox" checked={inStock} onChange={e => setInStock(e.target.checked)} />
      <label>Category</label>
      <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
}
