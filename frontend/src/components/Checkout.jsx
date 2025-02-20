import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
import { usePrice } from '../context/price';
import { useToken } from '../context/ordertoken';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ totalPrice }) => {
  const [price, setPrice] = usePrice();
  const [t, setT] = useToken();
  const [auth] = useAuth();
  const [cartitem] = useCart();
  const navigate = useNavigate();

  const tokenHandler = async (token) => {
    console.log('Token received:', token);
    setT(token);
    setPrice(totalPrice);

    try {
      const res = await axios.post('http://localhost:8000/api/payment/order', {
        token,
        auth,
        price: totalPrice,
        cartitem
      });

      if (res) {
        console.log(res.data);
        navigate("/order");
        
      }
    } catch (error) {
      console.error('Payment error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    console.log('Token:', t);
    console.log('Price:', price);
    console.log('Cart Items:', cartitem);
  }, [t, price, cartitem]);

  return (
    <>
      <StripeCheckout
        amount={totalPrice * 100} // Stripe requires the amount in smallest currency unit
        shippingAddress
        token={tokenHandler}
        stripeKey='pk_test_51PX0dPRpmCuAmYqnA13n9QHTARlRJHrjch2wzT6yCeiL0kmPX3iRn94FAEQ2nfARh9kergEoJ48OPBB9jij5AC7v00VNvAoHYF'
        currency='INR'
      >
        <Button>Pay now</Button>
      </StripeCheckout>
    </>
  );
};

export default Checkout;
