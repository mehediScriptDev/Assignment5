import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiUpload, FiX, FiCamera, FiTrash2 } from 'react-icons/fi';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';
import { AuthContext } from '../../context/AuthContext';

const getFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}${path}`;
};

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    bio: '', 
    title: '', 
    location: '', 
    phone: '', 
    skills: [],
    profilePictureUrl: '' 
  });
  const [skillInput, setSkillInput] = useState('');
  const [resume, setResume] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setInitialLoading(true);
        const res = await client.get('/users/profile');
        if (res.data && res.data.success && mounted) {
          const u = res.data.data;
          setForm({
            name: u.name || '',
            email: u.email || '',
            bio: u.bio || '',
            title: u.title || '',
            location: u.location || '',
            phone: u.phone || '',
            skills: Array.isArray(u.skills) ? u.skills : (u.skills ? JSON.parse(u.skills) : []),
            profilePictureUrl: u.profilePictureUrl || ''
          });
        }
      } catch (e) {
        console.error('Failed to load profile', e);
        showToast && showToast(e?.response?.data?.message || 'Failed to load profile', { type: 'error' });
      } finally {
        if (mounted) setInitialLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [showToast]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;
    if (form.skills.includes(skill)) {
      showToast && showToast('Skill already added', { type: 'error' });
      return;
    }
    setForm(prev => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast && showToast('Resume file must be less than 5MB', { type: 'error' });
      return;
    }
    setResume(file);
  };

  const uploadResume = async () => {
    if (!resume) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('resume', resume);
      const res = await client.post('/users/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) {
        showToast && showToast('Resume uploaded successfully', { type: 'success' });
        setResume(null);
      }
    } catch (err) {
      console.error('Resume upload failed', err);
      showToast && showToast(err?.response?.data?.message || 'Failed to upload resume', { type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast && showToast('Please upload a valid image file (JPEG, PNG, GIF, WEBP)', { type: 'error' });
      return;
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast && showToast('Profile picture must be less than 5MB', { type: 'error' });
      return;
    }
    
    setProfilePicture(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadProfilePicture = async () => {
    if (!profilePicture) return;
    try {
      setUploadingPicture(true);
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      const res = await client.post('/users/profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) {
        showToast && showToast('Profile picture uploaded successfully', { type: 'success' });
        setForm(prev => ({ ...prev, profilePictureUrl: res.data.data.profilePictureUrl }));
        setProfilePicture(null);
        setProfilePreview(null);
        // Update auth context if available
        if (updateUser && res.data.data) {
          updateUser(res.data.data);
        }
      }
    } catch (err) {
      console.error('Profile picture upload failed', err);
      showToast && showToast(err?.response?.data?.message || 'Failed to upload profile picture', { type: 'error' });
    } finally {
      setUploadingPicture(false);
    }
  };

  const cancelProfilePicture = () => {
    setProfilePicture(null);
    setProfilePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await client.put('/users/profile', form);
      if (res.data && res.data.success) {
        showToast && showToast('Profile updated successfully', { type: 'success' });
        setTimeout(() => navigate('/user-profile'), 600);
      }
    } catch (err) {
      console.error('Update failed', err);
      const msg = err?.response?.data?.message || 'Failed to update profile';
      setError(msg);
      showToast && showToast(msg, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="py-6 text-center">Loading profile…</div>;

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-muted-foreground">Update your personal details and resume.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <form className="card p-6 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

          {/* Profile Picture Section */}
          <div className="pb-6 border-b border-border">
            <label className="label block mb-4">Profile Picture</label>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-32 w-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-2 border-border">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : form.profilePictureUrl ? (
                    <img src={getFileUrl(form.profilePictureUrl)} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-3xl font-bold text-primary">
                      {form.name ? form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'US'}
                    </div>
                  )}
                  <label 
                    htmlFor="profile-picture-input" 
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <FiCamera className="h-8 w-8 text-white" />
                  </label>
                </div>
                <input 
                  id="profile-picture-input"
                  type="file" 
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </div>
              
              <div className="flex-1">
                {profilePicture ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{profilePicture.name}</span>
                      <span className="text-xs text-muted-foreground">({(profilePicture.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={uploadProfilePicture} 
                        disabled={uploadingPicture}
                        className="btn btn-primary btn-sm"
                      >
                        <FiUpload className="h-4 w-4 mr-2" />
                        {uploadingPicture ? 'Uploading...' : 'Upload Picture'}
                      </button>
                      <button 
                        type="button" 
                        onClick={cancelProfilePicture} 
                        className="btn btn-outline btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Click on the avatar or choose a file to upload your profile picture. This helps companies recognize you.
                    </p>
                    <label htmlFor="profile-picture-input" className="btn btn-outline btn-sm cursor-pointer">
                      <FiCamera className="h-4 w-4 mr-2" />
                      Choose Picture
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">Accepted formats: JPEG, PNG, GIF, WEBP (max 5MB)</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="label block mb-2">Full Name *</label>
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="input" 
                placeholder="John Doe" 
                required 
              />
            </div>

            <div>
              <label className="label block mb-2">Email *</label>
              <input 
                type="email"
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                className="input" 
                placeholder="john.doe@example.com" 
                required 
              />
            </div>

            <div>
              <label className="label block mb-2">Professional Title</label>
              <input 
                name="title" 
                value={form.title} 
                onChange={handleChange} 
                className="input" 
                placeholder="e.g. Senior Software Engineer" 
              />
            </div>

            <div>
              <label className="label block mb-2">Location</label>
              <input 
                name="location" 
                value={form.location} 
                onChange={handleChange} 
                className="input" 
                placeholder="e.g. San Francisco, CA" 
              />
            </div>

            <div>
              <label className="label block mb-2">Phone</label>
              <input 
                type="tel"
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                className="input" 
                placeholder="+1 (555) 123-4567" 
              />
            </div>

            <div>
              <label className="label block mb-2">Bio</label>
              <textarea 
                name="bio" 
                value={form.bio} 
                onChange={handleChange} 
                className="textarea" 
                rows={5}
                placeholder="Tell us about yourself, your experience, and what you're looking for..."
              />
            </div>

            <div>
              <label className="label block mb-2">Skills</label>
              <div className="flex gap-2 mb-3">
                <input 
                  type="text"
                  value={skillInput} 
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  className="input flex-1" 
                  placeholder="Type a skill and press Add" 
                />
                <button 
                  type="button" 
                  onClick={addSkill} 
                  className="btn btn-outline"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.skills.length > 0 ? (
                  form.skills.map(skill => (
                    <span key={skill} className="badge badge-secondary inline-flex items-center gap-1">
                      {skill}
                      <button 
                        type="button" 
                        onClick={() => removeSkill(skill)} 
                        className="hover:text-red-600"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No skills added yet</p>
                )}
              </div>
            </div>

            <div>
              <label className="label block mb-2">Resume</label>
              <div className="space-y-3">
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="input"
                />
                {resume && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{resume.name}</span>
                    <button 
                      type="button" 
                      onClick={uploadResume} 
                      disabled={uploading}
                      className="btn btn-primary btn-sm"
                    >
                      <FiUpload className="h-4 w-4 mr-2" />
                      {uploading ? 'Uploading...' : 'Upload Resume'}
                    </button>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX (max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link to="/user-profile" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditUserProfile;
