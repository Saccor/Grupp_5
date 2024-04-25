import React, { useState, useEffect } from 'react';

const EditOrderModal = ({ order, closeModal, handleOrderUpdate }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  useEffect(() => {
    // Refresh the component with new order data when the `order` prop changes
    setEditedOrder({ ...order });
  }, [order]);

  // Handle change for both customer details and order items
  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (index !== undefined) {
      // Updating the order items array
      const updatedItems = [...editedOrder.orderItems];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setEditedOrder(prev => ({ ...prev, orderItems: updatedItems }));
    } else {
      // Updating customer details
      setEditedOrder(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          [name]: value
        }
      }));
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    handleOrderUpdate(editedOrder);
  };

  if (!order) return null; // Render nothing if there is no order

  // Styles for modal and backdrop
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1050,
    background: '#FFF',
    padding: '30px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    width: '50%',
    maxWidth: '600px',
    maxHeight: '90%',
    overflowY: 'auto',
    border: '1px solid #ccc'
  };
  
  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1040
  };
  
  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };
  
  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    fontWeight: 'bold'
  };
  
  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4136',
    color: 'white',
  };
  
  const saveButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white',
  };
  
  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };
  
  const sectionStyle = {
    marginBottom: '15px'
  };
  

  return (
    <>
      <div style={backdropStyle} onClick={closeModal}></div>
      <div style={modalStyle}>
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit}>
          <div style={sectionStyle}>
            <label style={labelStyle}>First Name:</label>
            <input type="text" name="firstName" value={editedOrder.customer.firstName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={sectionStyle}>
            <label style={labelStyle}>Last Name:</label>
            <input type="text" name="lastName" value={editedOrder.customer.lastName} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={sectionStyle}>
            <label style={labelStyle}>Email:</label>
            <input type="email" name="email" value={editedOrder.customer.email} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={sectionStyle}>
            <label style={labelStyle}>Address:</label>
            <input type="text" name="address" value={editedOrder.customer.address} onChange={handleChange} style={inputStyle} />
          </div>
          {editedOrder.orderItems.map((item, index) => (
            <div key={index} style={sectionStyle}>
              <label style={labelStyle}>Product ID:</label>
              <input type="text" value={item.product} readOnly style={inputStyle} />
              <label style={labelStyle}>Quantity:</label>
              <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleChange(e, index)} style={inputStyle} />
            </div>
          ))}
          <div style={{ textAlign: 'right' }}>
            <button type="button" onClick={closeModal} style={cancelButtonStyle}>Cancel</button>
            <button type="submit" style={saveButtonStyle}>Save Changes</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditOrderModal;