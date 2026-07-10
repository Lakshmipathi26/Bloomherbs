import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/authSlice';
import SEO from '../../components/common/SEO';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const onSubmit = async (data) => {
    await dispatch(registerUser(data));
    navigate('/dashboard');
  };

  return (
    <>
      <SEO title="Register" description="Create a new BloomHerbs account." />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Join BloomHerbs and start shopping natural products</p>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrap">
                <FiUser size={18} />
                <input type="text" {...register('name', { required: 'Name is required' })} placeholder="John Doe" />
              </div>
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrap">
                <FiMail size={18} />
                <input type="email" {...register('email', { required: 'Email is required' })} placeholder="you@example.com" />
              </div>
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <FiLock size={18} />
                <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })} placeholder="••••••••" />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
