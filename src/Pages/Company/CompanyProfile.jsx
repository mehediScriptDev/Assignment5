import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import client from '../../api/client';

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    client
      .get(`/companies/${id}`)
      .then((res) => {
        setCompany(res.data?.data || res.data || null);
        setError(null);
      })
      .catch((err) => {
        // If company by slug not found, try fetching jobs by companyId and derive company info
        const status = err?.response?.status;
        if (status === 404) {
          client
            .get('/jobs', { params: { companyId: id, page: 1 } })
            .then((r) => {
              const jobs = r.data?.data || r.data?.data || [];
              if (jobs && jobs.length > 0 && jobs[0].company) {
                setCompany(jobs[0].company);
                setError(null);
              } else {
                setError('Company not found');
                setCompany(null);
              }
            })
            .catch(() => {
              setError('Company not found');
              setCompany(null);
            })
            .finally(() => setLoading(false));
          return;
        }

        setError(err?.response?.data?.message || err.message || 'Failed to load company');
        setCompany(null);
        setLoading(false);
      });
  }, [id]);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center py-12">Loading company…</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : company ? (
          <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow">
            <img
              src={company.logoUrl || company.logo || '/public/assets/default-logo.png'}
              alt={`${company.name} logo`}
              className="w-20 h-20 object-contain rounded-md bg-white p-2 border"
            />
            <div>
              <h1 className="text-2xl font-semibold">{company.name}</h1>
              {company.location && (
                <p className="text-sm text-muted-foreground">{company.location}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">Company not found.</div>
        )}
      </div>
    </main>
  );
};

export default CompanyProfile;
