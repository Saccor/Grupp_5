import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties, // Consider if this is still needed based on your schema updates
}) {
  const [name, setName] = useState(existingName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      name,
      description,
      price,
      category, // This will now take any text input by the user
      images, // Assuming the first image in the array
      inStock: true, // Assuming always true when creating/updating, adjust as needed
    };

    try {
      if (_id) {
        // Update existing product
        await axios.put(`/api/products/${_id}`, data);
      } else {
        // Create new product
        await axios.post('/api/products', data);
      }
      router.push('/products'); // Redirect to products page after saving
    } catch (error) {
      console.error('Failed to save product:', error);
      // Handle error appropriately
    }
  }

  async function uploadImages(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      for (const file of files) {
        formData.append('file', file);
      }
      try {
        const response = await axios.post('/api/upload', formData);
        setImages(oldImages => [...oldImages, ...response.data.links]); // Assume response.data.links contains the URLs of the uploaded images
      } catch (error) {
        console.error('Error uploading images:', error);
        // Handle error appropriately
      }
      setIsUploading(false);
    }
  }

  function updateImagesOrder(sortedImages) {
    setImages(sortedImages);
  }

  return (
    <form onSubmit={saveProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={ev => setName(ev.target.value)}
      />

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

      <label>Category</label>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={ev => setCategory(ev.target.value)}
      />

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {images.map((link, index) => (
            <div key={index} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt="product" className="rounded-lg"/>
            </div>
          ))}
        </ReactSortable>
        {isUploading && <Spinner />}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          Add image
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>

      <button type="submit" className="btn-primary">Save</button>
    </form>
  );
}
