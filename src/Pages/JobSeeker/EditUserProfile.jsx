import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import client from '../../api/client';

const EditUserProfile = () => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await client.get('/users/profile');
        if (res.data && res.data.success && mounted) {
          const u = res.data.data;
          setForm({
            name: u.name || '',
            email: u.email || ''
          });
        }
      } catch (e) {
        console.error('Failed to load profile', e);
        setError(e?.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
      try {
      setLoading(true);
      // backend supports PUT for profile update
      const res = await client.put('/users/profile', form);
      if (res.data && res.data.success) {
        setSuccess('Profile updated');
        setTimeout(() => { window.location.href = '/user-profile'; }, 800);
      }
    } catch (err) {
      console.error('Update failed', err);
      setError(err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-muted-foreground">Update your personal details and resume.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form className="card p-6" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-destructive mb-3">{error}</div>}
          {success && <div className="text-sm text-success mb-3">{success}</div>}

          <label className="label">Full name</label>
          <input name="name" value={form.name} onChange={handleChange} className="input mb-4" placeholder="John Doe" />

          <label className="label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="input mb-4" placeholder="john.doe@example.com" />

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            <Link to="/user-profile" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditUserProfile;
