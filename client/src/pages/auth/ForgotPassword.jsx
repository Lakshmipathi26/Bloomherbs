import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { forgotPassword } from '../../redux/slices/authSlice';
import SEO from '../../components/common/SEO';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const onSubmit = async (data) => {
    try {
      await dispatch(forgotPassword(data.email)).unwrap();
      toast.success('Reset link sent to your email');
    } catch (err) {
      toast.error(err || 'Failed to send reset email');
    }
  };

  return (
    <>
      <SEO title="Forgot Password" description="Reset your BloomHerbs account password." />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Forgot Password?</h1>
          <p className="auth-subtitle">Enter your email and we'll send you a reset link</p>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrap">
                <FiMail size={18} />
                <input type="email" {...register('email', { required: 'Email is required' })} placeholder="you@example.com" />
              </div>
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <p className="auth-footer">
            Remember your password? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
