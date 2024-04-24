import React, { useState, useEffect } from 'react';

const EditOrderModal = ({ order, closeModal, handleOrderUpdate }) => {
  const [editedOrder, setEditedOrder] = useState({ ...order });

  useEffect(() => {
    // When the modal opens, initialize it with the order's current data
    setEditedOrder({ ...order });
  }, [order]);

  const handleChangeCustomerDetails = (e) => {
    setEditedOrder({
      ...editedOrder,
      customer: {
        ...editedOrder.customer,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOrderUpdate(editedOrder);
  };

  // Modal style
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    background: '#FFF',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    width: '50%', // or any other size
    maxHeight: '80%',
    overflowY: 'auto'
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999 // Just below the modal
  };

  // Only render the modal if there is an order
  if (!order) return null;

  return (
    <>
      <div style={backdropStyle} onClick={closeModal}></div>
      <div style={modalStyle}>
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit}>
          {/* Fields for customer details */}
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={editedOrder.customer.firstName}
              onChange={handleChangeCustomerDetails}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={editedOrder.customer.lastName}
              onChange={handleChangeCustomerDetails}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editedOrder.customer.email}
              onChange={handleChangeCustomerDetails}
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={editedOrder.customer.address}
              onChange={handleChangeCustomerDetails}
            />
          </label>
          {/* You can add fields for editing order items or other details here */}
          <div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditOrderModal;
