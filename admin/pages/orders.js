import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
    });
  }, []);

  const handlePaymentStatusChange = (orderId, currentStatus) => {
    axios.put('/api/orders', { orderId, paid: !currentStatus })
      .then(response => {
        setOrders(orders.map(order => order._id === orderId ? response.data : order));
      })
      .catch(error => console.error("Failed to update order:", error));
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
            <th>Change Status</th>
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
            </td>
          </tr>
        )) : <tr><td colSpan="5">No orders found</td></tr>}
        </tbody>
      </table>
    </Layout>
  );
}
