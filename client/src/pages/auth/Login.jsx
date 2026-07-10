import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import SEO from '../../components/common/SEO';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);

  const onSubmit = async (data) => {
    await dispatch(loginUser(data));
    navigate('/dashboard');
  };

  return (
    <>
      <SEO title="Login" description="Sign in to your BloomHerbs account." />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue your shopping</p>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
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
                <input type="password" {...register('password', { required: 'Password is required' })} placeholder="••••••••" />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
          <p className="auth-footer">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
        </div>
      </div>
    </>
  );
}
