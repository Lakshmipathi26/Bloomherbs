import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function Profile() {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: 'John Doe', email: 'john@example.com', phone: '+91 98765 43210' } });

  const onSubmit = (data) => {
    /* update profile */
  };

  return (
    <>
      <SEO title="My Profile" description="Manage your BloomHerbs account settings." />
      <div className="container profile-page">
        <h1>My Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrap"><FiUser size={18} /><input {...register('name', { required: true })} /></div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrap"><FiMail size={18} /><input {...register('email', { required: true })} /></div>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <div className="input-wrap"><FiPhone size={18} /><input {...register('phone')} /></div>
          </div>
          <button type="submit" className="btn btn--primary">Save Changes</button>
        </form>
      </div>
    </>
  );
}
