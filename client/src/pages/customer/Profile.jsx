import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiSave } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchProfile, updateProfile } from '../../redux/slices/userSlice';
import SEO from '../../components/common/SEO';

export default function Profile() {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((s) => s.user);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: '', email: '', phone: '' },
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      register('name', { value: profile.name || '' });
      register('email', { value: profile.email || '' });
      register('phone', { value: profile.phone || '' });
    }
  }, [profile, register]);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(updateProfile(data)).unwrap();
      toast.success('Profile updated successfully');
      register('name', { value: res.name });
      register('email', { value: res.email });
      register('phone', { value: res.phone });
    } catch (err) {
      toast.error(err || 'Failed to update profile');
    }
  };

  return (
    <>
      <SEO title="My Profile" description="Manage your BloomHerbs account settings." />
      <div className="container profile-page">
        <h1>My Profile</h1>
        {loading ? (
          <p className="loading-text">Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrap"><FiUser size={18} /><input {...register('name', { required: 'Name is required' })} /></div>
              {errors.name && <span className="error">{errors.name.message}</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrap"><FiMail size={18} /><input type="email" {...register('email', { required: 'Email is required' })} /></div>
              {errors.email && <span className="error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <div className="input-wrap"><FiPhone size={18} /><input {...register('phone')} /></div>
            </div>
            <button type="submit" className="btn btn--primary"><FiSave size={16} /> Save Changes</button>
          </form>
        )}
      </div>
    </>
  );
}
