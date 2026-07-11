import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchCart } from '../../redux/slices/cartSlice';
import { createOrder } from '../../redux/slices/orderSlice';
import { clearCart } from '../../redux/slices/cartSlice';
import SEO from '../../components/common/SEO';

export default function Checkout() {
  const dispatch = useDispatch();
  const { cart, loading: cartLoading } = useSelector((s) => s.cart);
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (!cart && !cartLoading) {
      dispatch(fetchCart());
    }
  }, [cart, cartLoading, dispatch]);

  const subtotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = subtotal >= 500 ? 0 : subtotal > 0 ? 50 : 0;
  const discount = cart?.discountAmount || 0;
  const total = subtotal + shipping - discount;

  const onAddress = async (data) => {
    setStep(2);
  };

  const onPayment = async (data) => {
    setProcessing(true);
    try {
      const orderData = {
        shippingAddress: data,
        paymentMethod: data.paymentMethod,
        notes: data.notes || '',
      };
      const result = await dispatch(createOrder(orderData)).unwrap();
      await dispatch(clearCart());
      toast.success('Order placed successfully!');
      setStep(3);
    } catch (err) {
      toast.error(err || 'Failed to place order');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <SEO title="Checkout" description="Complete your BloomHerbs order." />
      <div className="container checkout-page">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}><span>1</span> Address</div>
          <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}><span>2</span> Payment</div>
          <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}><span>3</span> Review</div>
        </div>
        <div className="checkout-layout">
          <form onSubmit={step === 1 ? handleSubmit(onAddress) : handleSubmit(onPayment)} className="checkout-form">
            {step === 1 && (
              <div className="checkout-section">
                <h3><FiMapPin /> Shipping Address</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input {...register('fullName', { required: 'Full name is required' })} placeholder="John Doe" />
                    {errors.fullName && <span className="error">{errors.fullName.message}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input {...register('phone', { required: 'Phone is required' })} placeholder="+91 98765 43210" />
                    {errors.phone && <span className="error">{errors.phone.message}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Address Line 1</label>
                  <input {...register('addressLine1', { required: 'Address is required' })} placeholder="123 Main St, Apt 4B" />
                  {errors.addressLine1 && <span className="error">{errors.addressLine1.message}</span>}
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input {...register('city', { required: 'City is required' })} />
                    {errors.city && <span className="error">{errors.city.message}</span>}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input {...register('state', { required: 'State is required' })} />
                    {errors.state && <span className="error">{errors.state.message}</span>}
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input {...register('pincode', { required: 'Pincode is required' })} />
                    {errors.pincode && <span className="error">{errors.pincode.message}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <input {...register('country', { required: true })} defaultValue="India" />
                </div>
                <button type="submit" className="btn btn--primary" disabled={processing}>Continue to Payment</button>
              </div>
            )}
            {step === 2 && (
              <div className="checkout-section">
                <h3><FiCreditCard /> Payment Method</h3>
                <div className="form-group">
                  <label>Select Method</label>
                  <select {...register('paymentMethod', { required: 'Payment method is required' })}>
                    <option value="">Choose...</option>
                    <option value="razorpay">Razorpay (Online)</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                  {errors.paymentMethod && <span className="error">{errors.paymentMethod.message}</span>}
                </div>
                <div className="form-group">
                  <label>Order Notes (optional)</label>
                  <textarea rows="3" {...register('notes')} placeholder="Any special instructions..." />
                </div>
                <div className="checkout-actions">
                  <button type="button" className="btn btn--outline" onClick={() => setStep(1)}>Back</button>
                  <button type="submit" className="btn btn--primary" disabled={processing}>{processing ? 'Processing...' : 'Place Order'}</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="checkout-section">
                <div className="checkout-success">
                  <FiCheck size={48} />
                  <h3>Order Placed Successfully</h3>
                  <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
                  <button className="btn btn--primary" onClick={() => window.location.href = '/orders'}>View Orders</button>
                </div>
              </div>
            )}
          </form>

          {step < 3 && (
            <div className="checkout-summary">
              <h3>Order Summary</h3>
              {cart?.items?.map((item) => (
                <div key={item.product._id} className="summary-item">
                  <img src={item.product.images?.[0]?.url || '/placeholder.png'} alt={item.product.name} />
                  <div>
                    <p>{item.product.name}</p>
                    <span>Qty: {item.quantity} x ${item.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
              <div className="summary-rows">
                <div><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div><span>Shipping</span><span>{shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
                {discount > 0 && <div><span>Discount</span><span>-${discount.toFixed(2)}</span></div>}
                <div className="total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
