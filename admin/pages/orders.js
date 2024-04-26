import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditOrderModal from '@/components/EditOrderModal';
import styles from './orders.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPrintOrders, setSelectedPrintOrders] = useState({});

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    }).catch(error => {
      console.error("Failed to fetch orders:", error);
    });
  }, []);

  const handlePaymentStatusChange = (orderId, currentStatus) => {
    const updates = { paid: !currentStatus };
    axios.put('/api/orders', { orderId, updates })
      .then(response => {
        setOrders(orders.map(order => order._id === orderId ? response.data : order));
      })
      .catch(error => console.error("Failed to update order:", error));
  };

  const handleDeleteOrder = (orderId) => {
    axios.delete('/api/orders', { data: { orderId } })
      .then(() => {
        setOrders(orders.filter(order => order._id !== orderId));
      })
      .catch(error => console.error("Failed to delete order:", error));
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleOrderUpdate = (updatedOrder) => {
    axios.put('/api/orders', { orderId: updatedOrder._id, updates: updatedOrder })
      .then(response => {
        setOrders(orders.map(order => order._id === updatedOrder._id ? response.data : order));
        setIsEditModalOpen(false);
      })
      .catch(error => {
        console.error("Failed to update order:", error);
        setIsEditModalOpen(false);
      });
  };

  const togglePrintSelection = (orderId) => {
    setSelectedPrintOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <Layout>
      <h1>Orders</h1>
      <button onClick={() => window.print()} className={styles.printButton}>Print Selected Orders</button>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map(order => (
            <tr key={order._id}>
              <td><input type="checkbox" checked={!!selectedPrintOrders[order._id]} onChange={() => togglePrintSelection(order._id)} /></td>
              <td data-label="Order ID">{order._id}</td>
              <td data-label="Date">{new Date(order.createdAt).toLocaleString()}</td>
              <td data-label="Paid" className={order.paid ? styles.textGreen600 : styles.textRed600}>
                {order.paid ? 'YES' : 'NO'}
              </td>
              <td data-label="Recipient">
                {order.customer.firstName} {order.customer.lastName}<br />
                {order.customer.email}<br />
                {order.customer.address}
              </td>
              <td data-label="Products">
                {order.orderItems.map(item => (
                  <div key={item._id}>
                    {item.product} x {item.quantity}<br />
                  </div>
                ))}
              </td>
              <td data-label="Actions">
                <button
                  className={order.paid ? styles.markAsUnpaidButton : styles.markAsPaidButton}
                  onClick={() => handlePaymentStatusChange(order._id, order.paid)}
                >
                  Mark as {order.paid ? 'Unpaid' : 'Paid'}
                </button>
                <button className={styles.editButton} onClick={() => openEditModal(order)}>
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : <tr><td colSpan="7">No orders found</td></tr>}
        </tbody>
      </table>
      {isEditModalOpen && (
        <EditOrderModal
          order={selectedOrder}
          closeModal={() => setIsEditModalOpen(false)}
          handleOrderUpdate={handleOrderUpdate}
        />
      )}
    </Layout>
  );
}
