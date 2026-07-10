import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SEO from '../../components/common/SEO';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    toast.success('Message sent! We will get back to you soon.');
    reset();
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with BloomHerbs support team." />
      <div className="container contact-page">
        <h1>Contact Us</h1>
        <div className="contact-grid">
          <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input {...register('name', { required: true })} placeholder="Your name" />
              {errors.name && <span className="error">Required</span>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input {...register('email', { required: true })} placeholder="you@example.com" />
              {errors.email && <span className="error">Required</span>}
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" {...register('message', { required: true })} placeholder="How can we help?" />
              {errors.message && <span className="error">Required</span>}
            </div>
            <button type="submit" className="btn btn--primary"><FiSend /> Send Message</button>
          </form>
          <div className="contact-info">
            <div><FiMail /> support@bloomherbs.com</div>
            <div><FiPhone /> +91 98765 43210</div>
            <div><FiMapPin /> 123 Green Street, Chennai, India</div>
          </div>
        </div>
      </div>
    </>
  );
}
