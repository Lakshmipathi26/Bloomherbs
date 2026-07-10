import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLock } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import SEO from '../../components/common/SEO';

export default function ResetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((s) => s.auth);

  const onSubmit = async (data) => {
    await dispatch(/* resetPassword thunk to be added */ { type: 'placeholder' });
    toast.success('Password reset successful');
    navigate('/login');
  };

  return (
    <>
      <SEO title="Reset Password" description="Set a new password for your BloomHerbs account." />
      <div className="auth-page">
        <div className="auth-card">
          <h1>Reset Password</h1>
          <p className="auth-subtitle">Choose a new password for your account</p>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrap">
                <FiLock size={18} />
                <input type="password" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 chars' } })} placeholder="••••••••" />
              </div>
              {errors.password && <span className="error">{errors.password.message}</span>}
            </div>
            <button type="submit" className="btn btn--primary auth-submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
          <p className="auth-footer">
            <Link to="/login">Back to login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
