import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [customerDetails, setCustomerDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails({ ...customerDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: `${customerDetails.firstName} ${customerDetails.lastName}`,
                email: customerDetails.email,
            },
        });

        if (error) {
            console.log('[error]', error);
            return;
        }

        const orderData = {
            customer: customerDetails,
            paymentMethodId: paymentMethod.id,
            products: state.products,  // assuming products are passed in state
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, orderData);
            console.log("Payment and Order processed:", response.data);
            navigate("/order-confirmation");
        } catch (error) {
            console.error("Error processing payment and creating order:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input style={inputStyle} type="text" name="firstName" placeholder="First Name" value={customerDetails.firstName} onChange={handleInputChange} required />
            <input style={inputStyle} type="text" name="lastName" placeholder="Last Name" value={customerDetails.lastName} onChange={handleInputChange} required />
            <input style={inputStyle} type="email" name="email" placeholder="Email" value={customerDetails.email} onChange={handleInputChange} required />
            <input style={inputStyle} type="text" name="address" placeholder="Address" value={customerDetails.address} onChange={handleInputChange} required />
            <CardElement options={cardStyle} />
            <button style={buttonStyle} type="submit" disabled={!stripe}>Submit Payment</button>
        </form>
    );
};

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

// Styling
const formStyle = {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: 'white'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

const cardStyle = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

export default Payment;
