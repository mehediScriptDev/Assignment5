import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { 
  FiChevronRight, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiDownload, 
  FiCheck, 
  FiX,
  FiBriefcase,
  FiCalendar,
  FiUser
} from 'react-icons/fi';
import client from '../../api/client';
import { useToast } from '../../context/ToastContext';

const getFileUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const baseUrl = import.meta.env.VITE_API_BASE?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}${path}`;
};

const ApplicantDetail = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        setLoading(true);
        // Fetch all applicants and find the one matching applicationId
        const res = await client.get('/companies/applicants', { params: { page: 1, limit: 1000 } });
        if (res.data && res.data.success) {
          const found = (res.data.data || []).find(app => String(app.id) === String(applicationId));
          if (found) {
            setApplication(found);
          } else {
            showToast && showToast('Application not found', { type: 'error' });
          }
        }
      } catch (err) {
        console.error('Failed to load application', err);
        showToast && showToast('Failed to load applicant details', { type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      loadApplication();
    }
  }, [applicationId, showToast]);

  const handleStatusChange = async (status) => {
    try {
      const res = await client.patch(`/applications/${applicationId}/status`, { status });
      if (res.data && res.data.success) {
        showToast && showToast(`Application ${status}`, { type: 'success' });
        setApplication(prev => ({ ...prev, status }));
      }
    } catch (err) {
      console.error('Failed to update status', err);
      showToast && showToast('Failed to update status', { type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading applicant details...</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Application not found</div>
      </div>
    );
  }

  const user = application.user || {};
  const job = application.job || {};
  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'NA';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/company/dashboard" className="hover:text-primary">Dashboard</Link>
        <FiChevronRight className="h-4 w-4" />
        <Link to="/company/applicants" className="hover:text-primary">Applicants</Link>
        <FiChevronRight className="h-4 w-4" />
        <span className="text-foreground">Applicant Details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Applicant Header */}
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center shrink-0 overflow-hidden">
                {user.profilePictureUrl ? (
                  <img 
                    src={getFileUrl(user.profilePictureUrl)} 
                    alt={user.name || 'Applicant'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-2xl font-semibold text-primary">{initials}</div>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{user.name || 'Applicant'}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <FiMail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="h-4 w-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <FiMapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Applied For */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold mb-4">Applied For</h2>
            <div className="flex items-start gap-3">
              <FiBriefcase className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">{job.title || 'Job Title'}</h3>
                <p className="text-sm text-muted-foreground">{job.location || 'Location'} • {job.type || 'Job Type'}</p>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          {application.coverLetter && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Cover Letter</h2>
              <div className="prose max-w-none">
                <p className="text-sm whitespace-pre-wrap">{application.coverLetter}</p>
              </div>
            </div>
          )}

          {/* Experience */}
          {user.experience && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Experience</h2>
              <div className="text-sm">{user.experience}</div>
            </div>
          )}

          {/* Skills */}
          {user.skills && user.skills.length > 0 && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <span key={idx} className="badge badge-outline">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {application.answers && (
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
              <div className="text-sm whitespace-pre-wrap">{application.answers}</div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Actions</h3>
            <div className="space-y-3">
              {(user.resumeUrl || application.resumeUrl) && (
                <a
                  href={getFileUrl(user.resumeUrl || application.resumeUrl)}
                  download
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                >
                  <FiDownload className="h-4 w-4" />
                  Download Resume
                </a>
              )}
              
              {application.status !== 'Shortlisted' && application.status !== 'Hired' && (
                <button
                  onClick={() => handleStatusChange('Shortlisted')}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  <FiCheck className="h-4 w-4" />
                  Shortlist Application
                </button>
              )}
              
              {application.status !== 'Rejected' && (
                <button
                  onClick={() => handleStatusChange('Rejected')}
                  className="btn btn-outline w-full flex items-center justify-center gap-2"
                  style={{ borderColor: '#ef4444', color: '#ef4444' }}
                >
                  <FiX className="h-4 w-4" />
                  Reject Application
                </button>
              )}
            </div>
          </div>

          {/* Application Info */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Application Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Status</div>
                <span className={`badge ${
                  application.status === 'accepted' ? 'badge-success' :
                  application.status === 'rejected' ? 'badge-error' :
                  'badge-warning'
                }`}>
                  {application.status || 'pending'}
                </span>
              </div>
              
              <div>
                <div className="text-muted-foreground mb-1">Applied On</div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="h-4 w-4" />
                  {application.createdAt ? new Date(application.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Link */}
          <Link
            to={`/user-profile?userId=${user.id}`}
            className="btn btn-ghost w-full flex items-center justify-center gap-2"
          >
            <FiUser className="h-4 w-4" />
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
