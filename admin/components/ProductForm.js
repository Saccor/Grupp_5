import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Spinner from "@/components/Spinner";
import styles from '@/components/ProductForm.module.css'; // Import CSS module for styling

export default function ProductForm({
  _id, name: existingName, description: existingDescription,
  price: existingPrice, image: existingImage, inStock: existingInStock, category: existingCategory
}) {
  const [formState, setFormState] = useState({
    name: existingName || '',
    description: existingDescription || '',
    price: existingPrice || '',
    image: existingImage || '',
    inStock: existingInStock || false,
    category: existingCategory || ''
  });
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const uploadImage = async (ev) => {
    const file = ev.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      try {
        const res = await axios.post('/api/upload', formData);
        setFormState(prev => ({ ...prev, image: res.data.links[0] }));
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
    console.log(formState);
    try {
      if (_id) {
        await axios.put('/api/products', { ...formState, _id });
      } else {
        await axios.post('/api/products', formState);
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
    <form onSubmit={saveProduct} className={styles.form}>
      <label className={styles.label}>Product Name</label>
      <input className={styles.input} type="text" name="name" placeholder="Product name" value={formState.name} onChange={handleChange} />
      
      <label className={styles.label}>Image</label>
      {formState.image && <img src={formState.image} alt="Product" className={styles.imagePreview} />}
      <input type="file" onChange={uploadImage} />
      
      {isUploading && <Spinner />}
      
      <label className={styles.label}>Description</label>
      <textarea className={styles.textarea} name="description" placeholder="Description" value={formState.description} onChange={handleChange}></textarea>
      
      <label className={styles.label}>Price (in Kr)</label>
      <input className={styles.input} type="number" name="price" placeholder="Price" value={formState.price} onChange={handleChange} />
      
      <label className={styles.checkboxLabel}>In Stock
        <input type="checkbox" name="inStock" checked={formState.inStock} onChange={handleChange} />
        <span className={styles.slider}></span>
      </label>
      
      <label className={styles.label}>Category</label>
      <input className={styles.input} type="text" name="category" placeholder="Category" value={formState.category} onChange={handleChange} />
      
      <button type="submit" className={styles.saveButton}>Save</button>
    </form>
  );
}
