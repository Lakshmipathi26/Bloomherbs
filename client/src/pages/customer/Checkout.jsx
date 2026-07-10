import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);

  const onAddress = (data) => setStep(2);
  const onPayment = (data) => {
    /* initiate payment */
    setStep(3);
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
        <form onSubmit={step === 1 ? handleSubmit(onAddress) : handleSubmit(onPayment)} className="checkout-form">
          {step === 1 && (
            <div className="checkout-section">
              <h3><FiMapPin /> Shipping Address</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input {...register('fullName', { required: true })} placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input {...register('phone', { required: true })} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input {...register('addressLine1', { required: true })} placeholder="123 Main St, Apt 4B" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input {...register('city', { required: true })} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input {...register('state', { required: true })} />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input {...register('pincode', { required: true })} />
                </div>
              </div>
              <button type="submit" className="btn btn--primary">Continue to Payment</button>
            </div>
          )}
          {step === 2 && (
            <div className="checkout-section">
              <h3><FiCreditCard /> Payment Method</h3>
              <div className="form-group">
                <label>Select Method</label>
                <select {...register('paymentMethod', { required: true })}>
                  <option value="">Choose...</option>
                  <option value="razorpay">Razorpay (Online)</option>
                  <option value="cod">Cash on Delivery</option>
                </select>
              </div>
              <div className="checkout-actions">
                <button type="button" className="btn btn--outline" onClick={() => setStep(1)}>Back</button>
                <button type="submit" className="btn btn--primary">Review Order</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="checkout-section">
              <div className="checkout-success">
                <FiCheck size={48} />
                <h3>Order Placed Successfully</h3>
                <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
