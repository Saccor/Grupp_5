// pages/categories.js
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState('');
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get('/api/categories')
      .then(result => {
        if (result.data.success) {
          setCategories(result.data.data);
        } else {
          // Handle error appropriately, e.g., showing an alert or a message to the user
          swal.fire('Error', 'Failed to fetch categories', 'error');
        }
      })
      .catch(error => {
        // Handle error appropriately
        swal.fire('Error', 'An error occurred while fetching categories', 'error');
      });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    if (editedCategory) {
      try {
        await axios.put('/api/categories', { oldCategory: editedCategory, newCategory: name });
        swal.fire('Updated!', 'The category has been updated.', 'success');
      } catch (error) {
        swal.fire('Error', 'Failed to update category', 'error');
      }
    } else {
      swal.fire('Error', 'Creation of new categories is not supported in this model.', 'error');
    }
    setName('');
    setEditedCategory('');
    fetchCategories();
  }

  function editCategory(categoryName) {
    setEditedCategory(categoryName);
    setName(categoryName);
  }

  async function deleteCategory(categoryName) {
    swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${categoryName}? This will set affected products to 'Uncategorized'.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('/api/categories', { data: { category: categoryName } });
          swal.fire('Deleted!', 'The category has been deleted.', 'success');
          fetchCategories();
        } catch (error) {
          swal.fire('Error', 'Failed to delete category', 'error');
        }
      }
    });
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-xl font-bold mb-4">Categories Management</h1>
        <form onSubmit={saveCategory} className="mb-4">
          <input
            type="text"
            placeholder="Category name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {editedCategory ? 'Update Category' : 'Create Category'}
          </button>
        </form>
        <div className="mt-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((categoryName, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {categoryName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => editCategory(categoryName)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Edit
                    </button>
                    <button onClick={() => deleteCategory(categoryName)} className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withSwal(Categories);
