import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditOrderModal from '@/components/EditOrderModal'; // Ensure this path is accurate

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  return (
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
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
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'YES' : 'NO'}
              </td>
              <td>
                {order.customer.firstName} {order.customer.lastName}<br />
                {order.customer.email}<br />
                {order.customer.address}
              </td>
              <td>
                {order.orderItems.map(item => (
                  <div key={item._id}>
                    {item.product} x {item.quantity}<br />
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handlePaymentStatusChange(order._id, order.paid)}>
                  Mark as {order.paid ? 'Unpaid' : 'Paid'}
                </button>
                <button onClick={() => openEditModal(order)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </button>
              </td>
            </tr>
          )) : <tr><td colSpan="5">No orders found</td></tr>}
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
